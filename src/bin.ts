#!/usr/bin/env node
import commander from "commander";
import { getServerlessConfig, updateServerlessConfig } from ".";
commander.option(
  "-p --path <path>",
  "Working path for serverless package context",
  process.cwd()
);
commander
  .command("show")
  .description("Show the serverless configuration for this package")
  .action(() => {
    const config = getServerlessConfig(commander.path);
    process.stdout.write(JSON.stringify(config, null, 2));
  });
commander
  .command("set <key> <value>")
  .description("Update a single key to a specific value")
  .option(
    "-t --targetFile <filename>",
    "File to update - one of package.json or .serverlessrc",
    ".serverlessrc"
  )
  .option("-j --json", "Treat value as JSON string", false)
  .action((key, value, { targetFile, json }) => {
    if (json) value = JSON.parse(value);
    updateServerlessConfig({ [key]: value }, commander.path, targetFile);
  });
commander.parse(process.argv);

export { commander };
