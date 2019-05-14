# Fudge
A simple Solidity contract deployer that just works

## Installation
```bash
$ npm install fudge-cli -g
```

## Guide
### Initialise Fudge
```bash
$ fudge init
```

This creates the default directory structure used by Fudge:
```
.
├── .env
├── build
├── contracts
│   └── Example.sol
└── migrations
    └── 1_example_migration.js

```

### Setup environment
Fudge uses a straight forward .env file managed using the https://www.npmjs.com/package/dotenv package for all configuration.

By default it will look as below:
```
CONTRACT_DIRECTORY=./contracts
MIGRATION_DIRECTORY=./migrations
BUILD_DIRECTORY=./build/contracts

ETHEREUM_HOST=http://localhost:8545
ETHEREUM_ACCOUNT=0x0
ETHEREUM_ACCOUNT_PRIVATE_KEY=0x0
```

At minimum you will need to configure your `ETHEREUM_HOST`, `ETHEREUM_ACCOUNT` and `ETHEREUM_ACCOUNT_PRIVATE_KEY` for Fudge to function.

### Write your migrations
Migrations tell Fudge which contracts should be deployed to the network and how. **Contracts will not be deployed unless a migration exists instructing Fudge to do so**

A basic migrations is included in `fudge init` that deploys the `Example.sol` contract:

```javascript
const Example = require('../build/contracts/Example.json');

module.exports = deployer => {
  return deployer.deploy(Example);
}
```

Migrations are simply a function that takes in a `deployer` as a parameter. The `deployer` has one important method: `deploy(compiledContract, args)`.

The `compiledContract` here is the json file created during compilation. Each contract (*note: not each file*) will be given it's own json file in the `BUILD_DIRECTORY` with its contract name. For our Example contract, this file will be `Example.json`.

The `args` are the constructor parameters of our contract. In this case we don't have any constructor, so this can be left blank.

### Usage
```
$ fudge compile
```

You must first compile your contracts. This command will take all .sol files in the `CONTRACTS_DIRECTORY`, compile them and place the compiled contracts into the `BUILD_DIRECTORY`.

```
$ fudge deploy
```

With your contracts compiled, you can then use the deploy command to publis them to your configured `ETHEREUM_HOST`, signed with your `ETHEREUM_ACCOUNT` and `ETHEREUM_ACCOUNT_PRIVATE_KEY`.

## CLI
```
$ fudge --help
Usage: fudge [options] [command]

A simple Solidity compiler and deployer

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  init|i         Initialise the directory structure
  compile|c      Compile contracts
  deploy|d       Deploy contracts to the network

```