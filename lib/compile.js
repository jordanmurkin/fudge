const beautify = require("json-beautify");
const CompilationHelper = require('./utils/CompilationHelper');
const Utilities = require('./utils/Utilities');

const SOURCE_DIRECTORY = './contracts';
const BUILD_DIRECTORY = './build/contracts';

const compile = () => {
  return new Promise((resolve, reject) => {
    CompilationHelper.compileFilesInDirectory(SOURCE_DIRECTORY)
      .then(contractsPerFile => {
        const promises = [];

        contractsPerFile.forEach(file => {
          const contracts = Object.keys(file);

          contracts.forEach(contract => {
            file[contract].contractName = contract;

            promises.push(Utilities.writeToFile(`${BUILD_DIRECTORY}/${contract}.json`, beautify(file[contract], null, 2, 100)));
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