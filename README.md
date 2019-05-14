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