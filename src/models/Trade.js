const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Trade = sequelize.define(
  "Trade",
  {
    trade_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buy_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sell_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    price_per_coin: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    total_fiat: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
  },
  {
    tableName: "trades",
    timestamps: true,
    createdAt: "traded_at",
    updatedAt: false,
  }
);

Trade.associate = (models) => {
  Trade.belongsTo(models.TradeOrder, { foreignKey: "buy_order_id", as: "buyOrder" });
  Trade.belongsTo(models.TradeOrder, { foreignKey: "sell_order_id", as: "sellOrder" });
  Trade.belongsTo(models.User, { foreignKey: "buyer_id", as: "buyer" });
  Trade.belongsTo(models.User, { foreignKey: "seller_id", as: "seller" });
  Trade.belongsTo(models.Coin, { foreignKey: "coin_id", as: "coin" });
};

module.exports = Trade;
