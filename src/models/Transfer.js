const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transfer = sequelize.define(
  "Transfer",
  {
    transfer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    to_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    transfer_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["INTERNAL", "EXTERNAL"]],
      },
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: "PENDING",
      validate: {
        isIn: [["PENDING", "SUCCESS", "FAILED"]],
      },
    },
    fee: {
      type: DataTypes.DECIMAL(20, 8),
      defaultValue: 0.0,
    },
  },
  {
    tableName: "transfers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Transfer.associate = (models) => {
  Transfer.belongsTo(models.User, { foreignKey: "sender_id", as: "sender" });
  Transfer.belongsTo(models.User, { foreignKey: "receiver_id", as: "receiver" });
  Transfer.belongsTo(models.Coin, { foreignKey: "coin_id", as: "coin" });
};

module.exports = Transfer;
