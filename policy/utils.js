const fs = require("fs");

function traverse_directory(dir) {
  let files_path = [];

  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir);
    files.forEach((file) => {
      let curPath = dir + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        files_path.push(...traverse_directory(curPath));
      } else if (file.indexOf(".js") > -1) {
        files_path.push(curPath);
      }
    });
  }

  return files_path;
}

function get_node_packages() {
  let node_modules = [];

  if (fs.existsSync("./node_modules")) {
    node_modules = fs
      .readdirSync("./node_modules", { withFileTypes: true })
      .filter((d) => d.isDirectory());
  }

  return node_modules;
}

// as a PoC demonstrate allow all vs deny all
function gen_dependencies(perms) {
  let dependencies = {};

  if (perms) {
    dependencies = true;
  }

  return dependencies;
}

module.exports = { traverse_directory, gen_dependencies, get_node_packages };
