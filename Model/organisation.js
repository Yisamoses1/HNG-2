module.exports = (sequelize, Sequelize) => {
  const Organisation = sequelize.define("organisations", {
    orgId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Organisation;
};
  