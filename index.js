#!/usr/bin/env node

"use strict";

const path = require("path");
const RefParser = require("json-schema-ref-parser");
const { program } = require("commander");
const pkg = require("./package.json");

const params = program
  .name("oarq")
  .usage("[options]")
  .version(pkg.version)
  .requiredOption(
    "-i, --input <value>",
    "OpenAPI specification, can be a path, url or string content (required)"
  )
  .requiredOption("-o, --output <value>", "Output directory (required)")
  .parse(process.argv)
  .opts();

const generator = require(path.resolve(__dirname, "src/index.js"));

if (generator) {
  RefParser.bundle(params.input, params.input, {})
    .then((spec) => generator(spec, params.output))
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
