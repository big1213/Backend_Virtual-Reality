const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TradeOrder = sequelize.define(
  "TradeOrder",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fiat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        isIn: [["BUY", "SELL"]],
      },
    },
    price_per_coin: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    total_fiat: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: "OPEN",
      validate: {
        isIn: [["OPEN", "MATCHED", "CANCELLED"]],
      },
    },
  },
  {
    tableName: "trade_orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

TradeOrder.associate = (models) => {
  TradeOrder.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  TradeOrder.belongsTo(models.Coin, { foreignKey: "coin_id", as: "coin" });
  TradeOrder.belongsTo(models.FiatCurrency, { foreignKey: "fiat_id", as: "fiatCurrency" });
  TradeOrder.hasMany(models.Trade, { foreignKey: "buy_order_id", as: "buyTrades" });
  TradeOrder.hasMany(models.Trade, { foreignKey: "sell_order_id", as: "sellTrades" });
};

module.exports = TradeOrder;
