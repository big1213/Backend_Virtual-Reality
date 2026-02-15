const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FiatCurrency = sequelize.define(
  "FiatCurrency",
  {
    fiat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fiat_symbol: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
    fiat_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "fiat_currencies",
    timestamps: false,
  }
);

FiatCurrency.associate = (models) => {
  FiatCurrency.hasMany(models.FiatWallet, { foreignKey: "fiat_id", as: "wallets" });
  FiatCurrency.hasMany(models.TradeOrder, { foreignKey: "fiat_id", as: "tradeOrders" });
};

module.exports = FiatCurrency;
