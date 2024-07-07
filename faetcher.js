const { Sequelize, sequelize, User, Organisation } = require("./Model")

async function fetchUsers() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const users = await Organisation.findAll();
    console.log("Users:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

fetchUsers();
