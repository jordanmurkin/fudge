const fs = require('fs-extra');
const Utilities = require('./utils/Utilities');

const BUILD_DIRECTORY = './build/contracts';

const CONTRACT_DIRECTORY = './contracts';
const CONTRACT_FILE = 'Example.sol';
const CONTRACT_EXAMPLE = `
pragma solidity >0.6.0;

contract Example {
  uint public demo = 0;

  function setDemoVariable(uint x) external {
    demo = x;
  }
}
`;

const MIGRATION_DIRECTORY = './migrations';
const MIGRATION_FILE = '1_example_migration.js';
const MIGRATION_EXAMPLE = `
const Example = require('../build/contracts/Example.json');

module.exports = deployer => {
  return deployer.deploy(Example);
}
`;

const ENVIRONMENT_FILE = '.env';
const ENVIRONMENT_EXAMPLE = `
CONTRACT_DIRECTORY=${CONTRACT_DIRECTORY}
MIGRATION_DIRECTORY=${MIGRATION_DIRECTORY}
BUILD_DIRECTORY=${BUILD_DIRECTORY}

ETHEREUM_HOST=http://localhost:8545
ETHEREUM_ACCOUNT=0x0
ETHEREUM_ACCOUNT_PRIVATE_KEY=0x0
`;

const init = () => {
  return new Promise((resolve, reject) => {
    const promises = [];

    promises.push(fs.ensureDir(BUILD_DIRECTORY));
    promises.push(Utilities.writeToFile(`${ENVIRONMENT_FILE}`, ENVIRONMENT_EXAMPLE));
    promises.push(Utilities.writeToFile(`${CONTRACT_DIRECTORY}/${CONTRACT_FILE}`, CONTRACT_EXAMPLE));
    promises.push(Utilities.writeToFile(`${MIGRATION_DIRECTORY}/${MIGRATION_FILE}`, MIGRATION_EXAMPLE));

    resolve(Promise.all(promises));
  });
}

module.exports = init;