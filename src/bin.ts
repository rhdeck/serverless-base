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
const dep = commander
  .command("dependency")
  .description("Subcommands for dependency management");

dep
  .command("add <path> [name]")
  .description("add a dependency")
  .action((path, name) => {
    if (!name) {
      const o = getServerlessConfig(path);
      name = o.name;
    }
    if (name) {
      const thisConfig = getServerlessConfig(commander.path);
      if (!thisConfig.dependencies) thisConfig.dependencies = {};
      thisConfig.dependencies[name] = path;
      updateServerlessConfig(
        { dependencies: thisConfig.dependencies },
        commander.path
      );
    } else {
      console.error(
        "Could not add dependency at path",
        path,
        "because it is not a serverless package"
      );
    }
  });
dep
  .command("remove <name>")
  .description("remove a dependency")
  .action((name) => {
    const thisConfig = getServerlessConfig(commander.path);
    if (thisConfig.dependencies) {
      delete thisConfig.dependencies[name];
      updateServerlessConfig(
        { dependencies: thisConfig.dependencies },
        commander.path
      );
    }
  });
commander.parse(process.argv);

export { commander };
