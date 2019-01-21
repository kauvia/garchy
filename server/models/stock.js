'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    symbol: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Stock.associate = function(models) {
    Stock.belongsToMany(models.User,{
      through: models.Watchlist,
      foreignKey: "symbol",
      targetKey: "symbol"
    })  };
  return Stock;
};