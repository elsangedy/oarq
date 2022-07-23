const _ = require("lodash/fp");
const swagger2openapi = require("swagger2openapi");
const { runner, Logger } = require("hygen");
const path = require("path");
const templates = path.join(__dirname, "templates");

const defaultParams = {
  templates,
  cwd: process.cwd(),
  logger: new Logger(() => {}),
  createPrompter: () => require("enquirer"),
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {};
    return require("execa").shell(action, opts);
  },
  debug: !!process.env.DEBUG,
};

const AVAILABLE_VERBS = ["get", "post", "patch", "put", "delete"];

const isAvailabelVerb = _.includes(_.__, AVAILABLE_VERBS);
const pascalCase = _.compose(_.upperFirst, _.camelCase);
const not = (v) => !v;
const notEmpty = _.compose(not, _.isEmpty);
const concatString = _.curry((a, b) => a + b);
const throwError = (message) => {
  throw new Error(message);
};
const hasDuplicates = (arr) => new Set(arr).size != arr.length;
const hasHyphen = (str) => str.indexOf("-") > -1;
const fixTypeWhenHaveHyphen = (name) => (hasHyphen(name) ? `"${name}"` : name);

const convertToOpenApiSchema = (data) =>
  new Promise((resolve, reject) => {
    if (_.startsWith("3.0", data.openapi)) {
      resolve(data);
    }
    swagger2openapi.convertObj(data, {}, (err, convertedObj) => {
      if (err) {
        reject(err);
      } else {
        resolve(convertedObj.openapi);
      }
    });
  });

const validateSchema = _.compose(
  (operationsIds) => {
    const hasEmptyOperationsIds = _.some(_.isEmpty, operationsIds);

    if (hasEmptyOperationsIds) {
      throwError(`Every path must have a operationId or summary`);
    }

    if (hasDuplicates(operationsIds)) {
      throwError(`Every operationId must be uniq in your schema definition!`);
    }
  },
  _.flatten,
  _.map(
    _.compose(
      _.map(
        ([, operation]) =>
          operation.operationId || _.camelCase(operation.summary || "")
      ),
      _.filter(([verb]) => isAvailabelVerb(verb)),
      _.entries
    )
  ),
  _.values,
  _.prop("paths")
);

const refCond = (component, suffix = "") => [
  _.startsWith(`#/components/${component}`),
  _.compose(
    pascalCase,
    concatString(_.__, suffix),
    _.replace(`#/components/${component}/`, "")
  ),
];

const getRef = _.cond([
  refCond("schemas"),
  refCond("responses", "Response"),
  refCond("parameters", "Parameter"),
  refCond("requestBodies", "RequestBody"),
  [
    _.T,
    () =>
      throwError(
        "This library only resolve $ref that are include into `#/components/*` for now"
      ),
  ],
]);

const isScalarNumber = _.compose(
  _.includes(_.__, [
    "int32",
    "int64",
    "number",
    "integer",
    "long",
    "float",
    "double",
  ]),
  _.prop("type")
);
const isScalarString = _.compose(
  _.includes(_.__, [
    "string",
    "byte",
    "binary",
    "date",
    "dateTime",
    "date-time",
    "password",
  ]),
  _.prop("type")
);
const isScalarBoolean = _.propEq("type", "boolean");
const isScalarArray = _.propEq("type", "array");
const getScalarNullable = (item) => (item.nullable ? " | null" : "");
const getScalarString = (item) =>
  item.enum ? `"${item.enum.join(`" | "`)}"` : "string";
const getScalar = _.cond([
  [isScalarNumber, _.compose(concatString("number"), getScalarNullable)],
  [isScalarBoolean, _.compose(concatString("boolean"), getScalarNullable)],
  [
    isScalarArray,
    (item) => concatString(getArray(item), getScalarNullable(item)),
  ],
  [
    isScalarString,
    (item) => concatString(getScalarString(item), getScalarNullable(item)),
  ],
  [_.T, (item) => concatString(getObject(item), getScalarNullable(item))],
]);

const isReference = _.compose(notEmpty, _.prop("$ref"));

const getArray = (item) => {
  if (!item.items) {
    throw new Error("All arrays must have an `items` key define");
  }
  if (!isReference(item.items) && (item.items.oneOf || item.items.allOf)) {
    return `(${resolveTypeValue(item.items)})[]`;
  }
  return `${resolveTypeValue(item.items)}[]`;
};

const getObject = (item) => {
  if (isReference(item)) {
    return getRef(item.$ref);
  }

  if (item.allOf) {
    return item.allOf.map(resolveTypeValue).join(" & ");
  }

  if (item.oneOf) {
    return item.oneOf.map(resolveTypeValue).join(" | ");
  }

  if (item.properties) {
    return (
      "{ " +
      Object.entries(item.properties)
        .filter(([_, prop]) => !prop.readOnly)
        .map(
          ([key, prop]) =>
            `${key}${
              (item.required || []).includes(key) ? "" : "?"
            }: ${resolveTypeValue(prop)}`
        )
        .join("; ") +
      " }"
    );
  }

  return item.type === "object" ? "{}" : "any";
};

const resolveTypeValue = (schema) => {
  if (isReference(schema)) {
    return getRef(schema.$ref);
  }
  return getScalar(schema);
};

const generateSchemasDefinition = (schemas = {}) => {
  if (_.isEmpty(schemas)) return [];
  return Object.entries(schemas).map(([name, schema]) =>
    (!schema.type || schema.type === "object") &&
    !schema.allOf &&
    !schema.oneOf &&
    !isReference(schema) &&
    !schema.nullable
      ? `export type ${pascalCase(name)} = ${getScalar(schema)}`
      : `export type ${pascalCase(name)} = ${resolveTypeValue(schema)}`
  );
};
const generateResponsesDefinition = (responses = {}) => {
  if (_.isEmpty(responses)) return [];
  return Object.entries(responses).map(([name, response]) => {
    const type = getResReqTypes([["", response]]);
    // if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
    //   return `export interface ${pascalCase(name)}Response ${type}`;
    // } else {
    return `export type ${pascalCase(name)}Response = ${type}`;
    // }
  });
};
const generateRequestBodiesDefinition = (requestBodies = {}) => {
  if (_.isEmpty(requestBodies)) return [];
  return Object.entries(requestBodies).map(([name, requestBody]) => {
    const type = getResReqTypes([["", requestBody]]);
    // if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
    //   return `export interface ${pascalCase(name)}RequestBody ${type}`;
    // } else {
    return `export type ${pascalCase(name)}RequestBody = ${type};`;
    // }
  });
};
const generatorGlobalTypes = (schema) => [
  ...generateSchemasDefinition(schema.components && schema.components.schemas),
  ...generateResponsesDefinition(
    schema.components && schema.components.responses
  ),
  ...generateRequestBodiesDefinition(
    schema.components && schema.components.requestBodies
  ),
];

const getResReqTypes = (responsesOrRequests) =>
  responsesOrRequests
    .map(([_, res]) => {
      if (!res) return "void";
      if (isReference(res)) return getRef(res.$ref);
      if (res.content && res.content["application/json"])
        return resolveTypeValue(res.content["application/json"].schema);
      if (res.content && res.content["application/octet-stream"])
        return resolveTypeValue(res.content["application/octet-stream"].schema);
      return "void";
    })
    .join(" | ");

const getOptions = _.compose(
  _.flatten,
  _.map(([route, verbs]) =>
    _.compose(
      _.map(([verb, operation]) => {
        const isQuery = verb === "get";
        const allParams = [
          ...(verbs.parameters || []),
          ...(operation.parameters || []),
        ];
        const pathParamsBase = allParams.filter((param) => param.in === "path");
        const searchParamsBase = allParams.filter(
          (param) => param.in === "query"
        );

        const operationName = concatString(
          isQuery ? "query" : "mutation",
          pascalCase(
            operation.operationId || _.camelCase(operation.summary || "")
          )
        );

        const responseType = getResReqTypes(
          Object.entries(operation.responses).filter(([statusCode]) =>
            statusCode.toString().startsWith("2")
          )
        );
        const requestBodyType = getResReqTypes([
          ["body", operation.requestBody],
        ]);
        const pathParamsType = pathParamsBase
          .map(
            (p) =>
              `${p.name}${p.required ? "" : "?"}: ${resolveTypeValue(p.schema)}`
          )
          .join("; ");
        const searchParamsType = searchParamsBase
          .map(
            (p) =>
              `${fixTypeWhenHaveHyphen(p.name)}${
                p.required ? "" : "?"
              }: ${resolveTypeValue(p.schema)}`
          )
          .join("; ");

        return {
          verb: verb.toLowerCase(),
          route,
          isQuery,
          responseType,
          pathParamsType,
          searchParamsType,
          requestBodyType,
          operationName,
        };
      }),
      _.filter(([verb]) => isAvailabelVerb(verb)),
      _.entries
    )(verbs)
  ),
  _.entries,
  _.prop("paths")
);

async function generator(spec, outputpath) {
  const schema = await convertToOpenApiSchema(spec);
  validateSchema(schema);
  await runner(`generator init --outputpath ${outputpath}`, defaultParams);
  const models = generatorGlobalTypes(schema);
  for (let model of models) {
    await runner(
      `generator model --outputpath ${outputpath} --model "${model}"`,
      defaultParams
    );
  }
  const options = getOptions(schema);
  for (let option of options) {
    const {
      verb,
      route,
      isQuery,
      responseType,
      pathParamsType,
      searchParamsType,
      operationName,
    } = option;
    const requestBodyType =
      option.requestBodyType && option.requestBodyType !== "void"
        ? option.requestBodyType
        : "";

    if (isQuery && !pathParamsType && !searchParamsType) {
      await runner(
        `generator query --outputpath ${outputpath} --name ${operationName} --url ${route} --output "${responseType}"`,
        defaultParams
      );
    }
    if (isQuery && pathParamsType && !searchParamsType) {
      await runner(
        `generator query-with-pathparams --outputpath ${outputpath} --name ${operationName} --url ${route} --output "${responseType}" --pathparams "${pathParamsType}"`,
        defaultParams
      );
    }
    if (isQuery && !pathParamsType && searchParamsType) {
      await runner(
        `generator query-with-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --output "${responseType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }
    if (isQuery && pathParamsType && searchParamsType) {
      await runner(
        `generator query-with-pathparams-and-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --output "${responseType}" --pathparams "${pathParamsType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }

    if (!isQuery && !pathParamsType && !searchParamsType && !requestBodyType) {
      await runner(
        `generator mutation --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}"`,
        defaultParams
      );
    }
    if (!isQuery && pathParamsType && !searchParamsType && !requestBodyType) {
      await runner(
        `generator mutation-with-pathparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --pathparams "${pathParamsType}"`,
        defaultParams
      );
    }
    if (!isQuery && !pathParamsType && searchParamsType && !requestBodyType) {
      await runner(
        `generator mutation-with-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }
    if (!isQuery && pathParamsType && searchParamsType && !requestBodyType) {
      await runner(
        `generator mutation-with-pathparams-and-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --pathparams "${pathParamsType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }

    if (!isQuery && !pathParamsType && !searchParamsType && requestBodyType) {
      await runner(
        `generator mutation-with-body --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --input "${requestBodyType}"`,
        defaultParams
      );
    }
    if (!isQuery && pathParamsType && !searchParamsType && requestBodyType) {
      await runner(
        `generator mutation-with-body-and-pathparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --input "${requestBodyType}" --pathparams "${pathParamsType}"`,
        defaultParams
      );
    }
    if (!isQuery && !pathParamsType && searchParamsType && requestBodyType) {
      await runner(
        `generator mutation-with-body-and-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --input "${requestBodyType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }
    if (!isQuery && pathParamsType && searchParamsType && requestBodyType) {
      await runner(
        `generator mutation-with-body-and-pathparams-and-searchparams --outputpath ${outputpath} --name ${operationName} --url ${route} --method ${verb} --output "${responseType}" --input "${requestBodyType}" --pathparams "${pathParamsType}" --searchparams "${searchParamsType}"`,
        defaultParams
      );
    }
  }
}

module.exports = generator;
