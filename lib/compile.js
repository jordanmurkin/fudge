const beautify = require("json-beautify");
const CompilationHelper = require('./utils/CompilationHelper');
const Utilities = require('./utils/Utilities');

const SOURCE_DIRECTORY = './contracts';
const BUILD_DIRECTORY = './build/contracts';

const compile = () => {
  return new Promise((resolve, reject) => {
    CompilationHelper.compileFilesInDirectory(SOURCE_DIRECTORY)
      .then(compiledFiles => {
        const promises = [];

        compiledFiles.forEach(compiledfile => {
          const contracts = Object.keys(compiledfile);

          contracts.forEach(contract => {
            compiledfile[contract].contractName = contract;

            promises.push(Utilities.writeToFile(`${BUILD_DIRECTORY}/${contract}.json`, beautify(compiledfile[contract], null, 2, 100)));
          });
        });

        return Promise.all(promises);
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = compile;