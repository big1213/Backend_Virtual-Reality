const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Coin = sequelize.define(
  "Coin",
  {
    coin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coin_symbol: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
    coin_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "coins",
    timestamps: false,
  }
);

Coin.associate = (models) => {
  Coin.hasMany(models.CryptoWallet, { foreignKey: "coin_id", as: "wallets" });
  Coin.hasMany(models.TradeOrder, { foreignKey: "coin_id", as: "tradeOrders" });
  Coin.hasMany(models.Trade, { foreignKey: "coin_id", as: "trades" });
  Coin.hasMany(models.Transfer, { foreignKey: "coin_id", as: "transfers" });
};

module.exports = Coin;
