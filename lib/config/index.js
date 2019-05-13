require('dotenv').config(); // Instatiate environment variables

let CONFIG = {} // Make this global to use all over the application

CONFIG.ethereum_host = process.env.ETHEREUM_HOST || 'http://localhost:8545';
CONFIG.ethereum_account = process.env.ETHEREUM_ACCOUNT || '0x0';
CONFIG.ethereum_account_private_key = process.env.ETHEREUM_ACCOUNT_PRIVATE_KEY || 'PRIVATE_KEY';

module.exports = CONFIG;