#!/usr/bin/env node

const program = require('commander');
const packagejson = require('../package.json');

// Modules
const init = require('../lib/init');
const compile = require('../lib/compile');
const deploy = require('../lib/deploy');

program
  .version(packagejson.version)
  .description("A simple Solidity compiler and deployer");

/**
 * Init
 * 
 * Initialises the directory structure with example configuration
 */
program
  .command('init')
  .alias('i')
  .description('Initialise the directory structure')
  .action((cmd, options) => {
    init()
    .then(() => {
      console.log("");
      console.log("-- SUCCESSFULLY INITIALISED --");
      console.log("");
      console.log("You should now configure your .env to your needs");
      console.log("");
      console.log("When you are happy with your configuration you can then use:");
      console.log("`fudge compile` - to compile your contracts");
      console.log("`fudge deploy` - to deploy your contracts to the network");
      console.log("");
    })
    .catch(error => {
      console.log(error);
    });
  })
  .on('--help', () => {
    console.log("Init help")
  });

/**
 * Compile
 * 
 * Compiles contracts in the contract_directory and builds them into the build_directory
 */
program
  .command('compile')
  .alias('c')
  .description('Compile contracts')
  .action((cmd, options) => {
    compile()
    .then(() => {
      console.log("");
      console.log("-- SUCCESSFULLY COMPILED --");
      console.log("");
    })
    .catch(error => {
      console.log(error);
    });
  })
  .on('--help', () => {
    console.log("Compile help")
  });

/**
 * Deploy
 * 
 * Deploys all contracts in the build_directory to the configured Ethereum network
 */
program
  .command('deploy')
  .alias('d')
  .description('Deploy contracts to the network')
  .action((cmd, options) => {
    deploy()
    .then(migrations => {
      console.log("");
      console.log("-- SUCCESSFULLY DEPLOYED --");
      console.log("");
    })
    .catch(error => {
      console.log(error);
    });
  })
  .on('--help', () => {
    console.log("Deploy help")
  });

program.parse(process.argv);