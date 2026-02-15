const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    kyc_status: {
      type: DataTypes.STRING(20),
      defaultValue: "PENDING",
      validate: {
        isIn: [["PENDING", "VERIFIED", "REJECTED"]],
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// ==================== Relationships ====================

// User hasMany CryptoWallet (ผู้ใช้มีหลายกระเป๋า Crypto)
User.associate = (models) => {
  User.hasMany(models.CryptoWallet, { foreignKey: "user_id", as: "cryptoWallets" });
  User.hasMany(models.FiatWallet, { foreignKey: "user_id", as: "fiatWallets" });
  User.hasMany(models.TradeOrder, { foreignKey: "user_id", as: "tradeOrders" });
  User.hasMany(models.Trade, { foreignKey: "buyer_id", as: "buyTrades" });
  User.hasMany(models.Trade, { foreignKey: "seller_id", as: "sellTrades" });
  User.hasMany(models.Transfer, { foreignKey: "sender_id", as: "sentTransfers" });
  User.hasMany(models.Transfer, { foreignKey: "receiver_id", as: "receivedTransfers" });
};

module.exports = User;
