const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FiatWallet = sequelize.define(
  "FiatWallet",
  {
    fiat_wallet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fiat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0.0,
    },
  },
  {
    tableName: "fiat_wallets",
    timestamps: false,
    indexes: [{ unique: true, fields: ["user_id", "fiat_id"] }],
  }
);

FiatWallet.associate = (models) => {
  FiatWallet.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
  FiatWallet.belongsTo(models.FiatCurrency, { foreignKey: "fiat_id", as: "currency" });
};

module.exports = FiatWallet;
