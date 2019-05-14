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