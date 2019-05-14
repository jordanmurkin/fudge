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

The order of migrations is often important to ensure that deployment is successful. To specify the order of the migrations you should place your migrations in individual files with a numerical prefix. For example `1_example_migration.js` will run before `2_example_migration.js`.

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

## More complex examples

### Deployed contract address as constructor
Often contracts are dependent on another contract as thus the deployed address of one must be supplied as a constructor to another. This example will cover how to use Fudge to achieve this.

Consider the below contracts.
```javascript
// ./contracts/Contract.sol

pragma solidity ^0.5.0;

contract Dog {
  string public name;
  
  constructor(string memory _name) public {
    name = _name;
  }
}

contract HumanWithDog {
    Dog public dog;
    
    constructor(Dog _dog) public {
        dog = _dog;
    }
}
```

To deploy these we will need to set up two migrations. One to deploy our Dog contract and another to deploy our HumanWithDog contract.

```javascript
// ./migrations/1_dog_migration.js

const Dog = require('../build/contracts/Dog.json');

module.exports = deployer => {
  return deployer.deploy(Dog, ["spot"]);
}
```

```javascript
// ./migrations/2_humanwithdog_migration.js 

const HumanWithDog = require('../build/contracts/HumanWithDog.json');
const Dog = require('../build/contracts/Dog.json');

module.exports = deployer => {
  return deployer.deploy(HumanWithDog, [Dog.deployment.address]);
}
```

The important points to note here are that:
1. As the migrations need to be executed in order. Our Dog migration is prefixed with `1_` and our HumanWithDog contract is prefixed with `2_`.
2. Arguments for migrations are always arrays
3. The deployed contract address is stored inside the build files inside the `deployment` section, thus can be accessed at `deployment.address`