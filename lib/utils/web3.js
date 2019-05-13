const CONFIG = require('../config');
const Web3 = require('web3');

// Establish connection to geth RPC
const web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.ethereum_host));

// check web3 has connected successfully
// if (!web3.isConnected()) {
//   throw new Error("Web3 was unable to connect to an RPC node.");
// }

module.exports = web3;