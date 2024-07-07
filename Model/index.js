const Sequelize = require("sequelize");
const config = require("../config/db").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port, // Ensure port is included
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // You might need to adjust this depending on your server's SSL setup
      },
    },
    logging: console.log, // Enable Sequelize logging for debugging
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./userModel")(sequelize, Sequelize);
db.Organisation = require("./organisation")(sequelize, Sequelize);

// Define associations
db.User.belongsToMany(db.Organisation, { through: "UserOrganisations" });
db.Organisation.belongsToMany(db.User, { through: "UserOrganisations" });

module.exports = db;
