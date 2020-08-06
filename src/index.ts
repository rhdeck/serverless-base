import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

//Load the serverless config for a package
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
