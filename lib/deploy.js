const fs = require('fs-extra');
const DeploymentHelper = require('./utils/DeploymentHelper');
const CONFIG = require('./config');

const deployMigrations = async (migrations) => {
  const receipts = [];

  for (let i = 0; i < migrations.length; i++) {
    let receipt = null;

    try {
      const file = migrations[i].file;
      const migration = migrations[i].migration;

      console.log(`Migrating: ${file}`);
      
      receipt = await migration(DeploymentHelper);
    } catch (error) {
      console.error("-- Please ensure that you have correctly configured the .env file --");

      throw error;
    }

    receipts.push(receipt);
  }

  return receipts;
}

const deploy = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(CONFIG.migration_directory)
      .then(files => {
        const migrations = [];

        files.forEach(file => {
          let migration = null;

          try {
            migration = require(`${process.cwd()}/${CONFIG.migration_directory}/${file}`);
          } catch (e) {
            throw e;
          }

          migrations.push({
            file,
            migration
          });
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