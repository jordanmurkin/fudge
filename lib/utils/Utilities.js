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
      })
    });
  }
}

module.exports = Utilities;