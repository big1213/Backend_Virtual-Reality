const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CryptoWallet = sequelize.define(
  "CryptoWallet",
  {
    wallet_id: {
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
    balance: {
      type: DataTypes.DECIMAL(20, 8),
      defaultValue: 0.0,
    },
    wallet_address: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "crypto_wallets",
    timestamps: false,
    indexes: [{ unique: true, fields: ["user_id", "coin_id"] }],
  }
);

CryptoWallet.associate = (models) => {
  CryptoWallet.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
  CryptoWallet.belongsTo(models.Coin, { foreignKey: "coin_id", as: "coin" });
};

module.exports = CryptoWallet;
