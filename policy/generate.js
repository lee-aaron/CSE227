const fs = require("fs");
const { fromStream } = require("ssri");
const { relative, sep } = require("path");

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
  }

  policyJson.scopes[path] = {
    integrity: true,
    dependencies: true,
  };

  fs.writeFile(
    `${baseDir}/policy.json`,
    JSON.stringify(policyJson, null, 2),
    (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    }
  );
  fs.chmod(`${baseDir}/policy.json`, 0o755, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
});
