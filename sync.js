const db = require("./Model");

const syncDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true }); // `force: true` will drop the table if it already exists
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
};

syncDatabase();
