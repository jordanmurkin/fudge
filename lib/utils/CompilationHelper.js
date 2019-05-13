const solc = require('solc');
const fs = require('fs-extra');

class CompilationHelper {
  static compileFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8')
        .then(fileContent => {
          resolve(CompilationHelper.compile(fileContent));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static compile(code) {
    const input = {
      language: 'Solidity',
      sources: {
        "input": {
          content: code
        }
      },
      settings: {
          outputSelection: {
              '*': {
                  '*': [ '*' ]
              }
          }
      }
    };

    return new Promise((resolve, reject) => {
      const output = JSON.parse(solc.compile(JSON.stringify(input)));

      resolve(output.contracts['input']);
    });
  }

  static compileFilesInDirectory(inputDirectory) {
    return new Promise((resolve, reject) => {
      fs.readdir(inputDirectory)
      .then(files => {
        const promises = [];

        files.forEach(file => {
          if (!file.endsWith(".sol")) {
            return;
          }
          console.log(file);

          promises.push(CompilationHelper.compileFile(`${inputDirectory}/${file}`));
        })

        resolve(Promise.all(promises));
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}

module.exports = CompilationHelper;