const fs = require("fs");
const { fromStream } = require("ssri");
const { relative, sep } = require("path");
const {
  traverse_directory,
  gen_dependencies,
  get_node_packages,
} = require("./utils");

const baseDir = process.cwd();

// parse file structure and create templated policy file
const REQ_FILE = `required-files.json`;

if (!fs.existsSync(REQ_FILE)) {
  console.log(`${REQ_FILE} not found.`);
  process.exit(1);
}

const files = fs.readFileSync(`${baseDir}/required-files.json`, "utf8");
const requiredFiles = JSON.parse(files);

const policyJson = {
  onerror: "log",
  resources: {},
  scopes: {},
};

const relativePath = (baseDir, path) => {
  let rel = relative(baseDir, path);
  const first = rel.split(sep)[0];
  if (first !== "." && first !== "..") rel = "." + sep + rel;
  return rel;
};

const computeIntegrity = async (path) => {
  const src = await fromStream(fs.createReadStream(path));
  return src.toString();
};

const node_packages = get_node_packages();

async function main() {
  await Promise.all(
    node_packages.map(async (package) => {

      if (Object.keys(requiredFiles).indexOf(package.name) > -1) {
        const dep = requiredFiles[package.name].dependencies;
        const scope = requiredFiles[package.name].scope;
        let path = relativePath(baseDir, "node_modules/" + package.name);

        // iterate thru each package and set dependencies for each file
        const files = traverse_directory(path);

        await Promise.all(
          files.map(async (file) => {
            const rel = relativePath(baseDir, file);
            const integrity = await computeIntegrity(rel);
            if (typeof dep === "boolean") {
              policyJson.resources[rel] = {
                integrity: integrity,
                dependencies: gen_dependencies(dep),
              };
            } else {
              policyJson.resources[rel] = {
                integrity: integrity,
                dependencies: dep,
              };
            }
          })
        );

        if (scope) {
          policyJson.scopes[path] = scope;
        }
      } else {
        // default no permissions
        let path = relativePath(baseDir, "node_modules/" + package.name);
        const files = traverse_directory(path);

        await Promise.all(
          files.map(async (file) => {
            const rel = relativePath(baseDir, file);
            const integrity = await computeIntegrity(rel);
            policyJson.resources[rel] = {
              integrity: integrity,
              dependencies: gen_dependencies(false),
            };
          })
        );
      }
    })
  );
  
  fs.writeFileSync(
    `${baseDir}/policy.json`,
    JSON.stringify(policyJson, null, 2)
  );
  fs.chmodSync(`${baseDir}/policy.json`, 0o755);
}

main();
