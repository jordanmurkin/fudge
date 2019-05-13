const fs = require('fs-extra');
const DeploymentHelper = require('./utils/DeploymentHelper');

const MIGRATIONS_DIRECTORY = './migrations';

const deployMigrations = async (migrations) => {
  const receipts = [];

  for (let i = 0; i < migrations.length; i++) {
    let receipt = null;

    try {
      receipt = await migrations[i](DeploymentHelper);
    } catch (error) {
      console.log(error);
    }

    receipts.push(receipt);
  }

  return receipts;
}

const deploy = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(MIGRATIONS_DIRECTORY)
      .then(files => {
        const migrations = [];

        files.forEach(file => {
          const migration = require(`${process.cwd()}/${MIGRATIONS_DIRECTORY}/${file}`);

          migrations.push(migration);
        })

        return deployMigrations(migrations);
      })
      .then(migrationResults => {
        resolve(migrationResults);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = deploy;