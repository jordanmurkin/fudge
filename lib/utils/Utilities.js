var fs = require('fs-extra');

class Utilities {
  static writeToFile(relativePathToFile, content) {
    return new Promise((resolve, reject) => {
      fs.ensureFile(relativePathToFile)
        .then(() => {
          resolve(fs.writeFile(relativePathToFile, content, 'utf8'));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static isDirEmpty(directory) {
    return new Promise((resolve, reject) => {
      fs.readdir(directory)
        .then(files => {
          if (files.length > 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(error => {
          reject(error);
        })
    });
  }
}

module.exports = Utilities;