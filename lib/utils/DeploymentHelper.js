const Utilities = require('./Utilities');
const BlockchainManager = require('../managers/BlockchainManager');
const CONFIG = require('../config');
const web3 = require('./web3');
const beautify = require("json-beautify");

const BUILD_DIRECTORY = './build/contracts';

class DeploymentHelper {
  static deployToNetwork(compiledContract, args = []) {
    return new Promise((resolve, reject) => {
      const abi = compiledContract.abi;
      const bytecode = `0x${compiledContract.evm.bytecode.object}`;

      console.log('Arguments:', args);

      const contract = new web3.eth.Contract(abi);
      const encodedAbi = contract.deploy({ data: bytecode, arguments: args }).encodeABI();

      const transactionObject = {
        from: CONFIG.ethereum_account,
        gasPrice: '20',
        data: encodedAbi
      };

      BlockchainManager.sendTransaction(transactionObject, CONFIG.ethereum_account_private_key)
        .then(receipt => {
          resolve({
            contract: compiledContract,
            receipt
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static storeContractReceipt(contract, receipt) {
    const contractName = contract.contractName;

    const deploymentDetails = {
      address: receipt.contractAddress,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    }

    console.log(`Deployed to: ${deploymentDetails.address} with transaction ${deploymentDetails.transactionHash}`)

    contract.deployment = deploymentDetails;

    return Utilities.writeToFile(`${BUILD_DIRECTORY}/${contractName}.json`, beautify(contract, null, 2, 100));
  }
  
  static deploy(compiledContract, args = []) {
    return new Promise((resolve, reject) => {
      DeploymentHelper.deployToNetwork(compiledContract, args)
      .then(deployedContract => {
        const contract = deployedContract.contract;
        const receipt = deployedContract.receipt;
        
        return DeploymentHelper.storeContractReceipt(contract, receipt);
      })
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      })
    });
  }
}

module.exports = DeploymentHelper;