const fs = require('fs-extra');
const DeploymentHelper = require('./utils/DeploymentHelper');

const MIGRATION_DIRECTORY = './migrations';

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
      console.log(error);
    }

    receipts.push(receipt);
  }

  return receipts;
}

const deploy = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(MIGRATION_DIRECTORY)
      .then(files => {
        const migrations = [];

        files.forEach(file => {
          const migration = require(`${process.cwd()}/${MIGRATION_DIRECTORY}/${file}`);

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