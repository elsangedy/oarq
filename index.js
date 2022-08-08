#!/usr/bin/env node

"use strict";

const path = require("path");
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
  generator(params.input, params.output)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
