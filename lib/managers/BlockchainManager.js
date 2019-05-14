const web3 = require('../utils/web3');

class BlockchainManager {
  static isConnected() {
    return new Promise((resolve, reject) => {
      web3.eth.net.isListening()
      .then(isListening => {
        resolve(isListening);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static sendTransaction(transactionObject, privateKey, resolveAtPending = false) {
    return new Promise((resolve, reject) => {
      web3.eth.estimateGas(transactionObject)
        .then(gasEstimate => {
          transactionObject.gas = gasEstimate;

          return web3.eth.accounts.signTransaction(transactionObject, privateKey);
        })
        .then(signedTransaction => {
          return web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
          .once('transactionHash', transactionHash => {
            if (resolveAtPending) {
              resolve(transactionHash);
            }
          })
          .on('error', error => {
            reject(error);
          });
        })
        .then(receipt => {
          resolve(receipt);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = BlockchainManager;