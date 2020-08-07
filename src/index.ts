import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

/**
 * Get the serverless object from package.json, serverless.config.js and .serverlessrc
 * @param path Path to serverless package (default is current path)
 */
export function getServerlessConfig(path: string = process.cwd()) {
  //Get from each type of file
  let out: { [key: string]: any } = {};
  if (existsSync(join(path, "package.json"))) {
    const { name, version, serverless } = JSON.parse(
      readFileSync(join(path, "package.json"), { encoding: "utf-8" })
    );
    out.name = name;
    out.version = version;
    if (serverless) out = { ...out, ...serverless };
  }
  if (existsSync(join(path, "serverless.config.js"))) {
    const result = require(join(path, "serverless.config.js"));
    if (result) out = { ...out, ...result };
  }
  if (existsSync(join(path, ".serverlessrc"))) {
    const result = JSON.parse(
      readFileSync(join(path, ".serverlessrc"), { encoding: "utf-8" })
    );
    if (result) out = { ...out, ...result };
  }
  return out;
}
/**
 * Save a new config map
 * @param newConfigMap New set of serverless considerations
 * @param path Path to the serverless package (default current path)
 * @param targetFile WHether to amend package.json or recreate .serverlessrc (defaults to the latter)
 */
export function writeServerlessConfig(
  newConfigMap: { [key: string]: any },
  path: string = process.cwd(),
  targetFile: "package.json" | ".serverlessrc" = ".serverlessrc"
) {
  switch (targetFile) {
    case "package.json": {
      let p = JSON.parse(
        readFileSync(join(path, "package.json"), { encoding: "utf-8" })
      );
      p.serverless = newConfigMap;
      writeFileSync(join(path, "package.json"), JSON.stringify(p, null, 2));
    }
    case ".serverlessrc":
      const json = JSON.stringify(newConfigMap);
      writeFileSync(join(path, ".serverlessrc"), json);
      break;
    default:
      throw new Error("Not a valid target for writing");
  }
}
/**
 * Update a serverless config (shallow only - replacing a tree element replaces the whole tree)
 * @param configUpdates Map of updates to change (e.g. `{name: "newName"}`)
 * @param path Path to the serverless package (default is current dir)
 * @param targetFile Whether to update package.json or .serverlessrc - defaults to latter
 */
export function updateServerlessConfig(
  configUpdates: { [key: string]: any },
  path: string = process.cwd(),
  targetFile: "package.json" | ".serverlessrc" = ".serverlessrc"
) {
  switch (targetFile) {
    case "package.json": {
      let p = JSON.parse(
        readFileSync(join(path, "package.json"), { encoding: "utf-8" })
      );
      if (!p.serverless) p.serverless = configUpdates;
      else p.serverless = { ...p.serverless, ...configUpdates };
      writeFileSync(join(path, "package.json"), JSON.stringify(p, null, 2));
    }
    case ".serverlessrc":
      if (!existsSync(join(path, ".serverlessrc")))
        return writeServerlessConfig(configUpdates, path, targetFile);
      let s = JSON.parse(
        readFileSync(join(path, ".serverlessrc"), { encoding: "utf-8" })
      );
      s = { ...s, ...configUpdates };
      const json = JSON.stringify(s, null, 2);
      writeFileSync(join(path, ".serverlessrc"), json);
      break;
    default:
      throw new Error("Not a valid target for writing");
  }
}
