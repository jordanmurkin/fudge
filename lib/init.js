const fs = require('fs-extra');

const BUILD_DIRECTORY = './build';
const CONTRACT_DIRECTORY = './contracts';
const MIGRATION_DIRECTORY = './migrations';

const ENVIRONMENT_FILE = '.env';

const ENVIRONMENT_EXAMPLE = `
CONTRACT_DIRECTORY=${CONTRACT_DIRECTORY}
MIGRATION_DIRECTORY=${MIGRATION_DIRECTORY}
BUILD_DIRECTORY=${BUILD_DIRECTORY}

ETHEREUM_HOST=http://localhost:8545
ETHEREUM_ACCOUNT_PRIVATE_KEY=0x0
`;

const createEnvironmentFile = () => {
  return new Promise((resolve, reject) => {
    fs.pathExists(ENVIRONMENT_FILE)
    .then(exists => {
      if (exists) {
        throw new Error("An environment file (.env) already exists in this folder");
      }

      return fs.ensureFile(ENVIRONMENT_FILE);
    })
    .then(() => {
      return fs.writeFile(ENVIRONMENT_FILE, ENVIRONMENT_EXAMPLE);
    })
    .then(() => {
      resolve(true);
    })
    .catch(error => {
      reject(error);
    });
  });
}

const init = () => {
  return new Promise((resolve, reject) => {
    const promises = [];

    promises.push(fs.ensureDir(BUILD_DIRECTORY));
    promises.push(fs.ensureDir(CONTRACT_DIRECTORY));
    promises.push(fs.ensureDir(MIGRATION_DIRECTORY));
    
    promises.push(createEnvironmentFile());

    resolve(Promise.all(promises));
  });
}

module.exports = init;