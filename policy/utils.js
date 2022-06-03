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

module.exports = traverse_directory;