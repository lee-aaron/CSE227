const fs = require("fs");
const { fromStream } = require("ssri");
const { relative, sep } = require("path");
const { traverse_directory, gen_dependencies } = require("./utils");

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
  onerror: "throw",
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

requiredFiles.forEach(async (file) => {
  // use scopes to create policy file
  let path = relativePath(baseDir, file);

  if (fs.lstatSync(file).isFile()) {
    const integrity = await computeIntegrity(file);
    policyJson.resources[path] = {
      integrity: integrity,
      dependencies: true,
    };
    policyJson.scopes[path] = {
      integrity: true,
      dependencies: true,
    };
  } else {
    const files = traverse_directory(file);

    await Promise.all(
      files.map(async (l_file) => {
        const integrity = await computeIntegrity(l_file);
        const relPath = relativePath(baseDir, l_file);

        policyJson.resources[relPath] = {
          integrity: integrity,
          dependencies: gen_dependencies(true),
        };
        policyJson.scopes[relPath] = {
          integrity: true,
          dependencies: gen_dependencies(true),
        };
      })
    );
  }

  fs.writeFileSync(
    `${baseDir}/policy.json`,
    JSON.stringify(policyJson, null, 2)
  );
  fs.chmodSync(`${baseDir}/policy.json`, 0o755);
});
