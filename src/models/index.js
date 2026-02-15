const sequelize = require("../config/database");

const User = require("./User");
const Coin = require("./Coin");
const FiatCurrency = require("./FiatCurrency");
const CryptoWallet = require("./CryptoWallet");
const FiatWallet = require("./FiatWallet");
const TradeOrder = require("./TradeOrder");
const Trade = require("./Trade");
const Transfer = require("./Transfer");

const models = {
  User,
  Coin,
  FiatCurrency,
  CryptoWallet,
  FiatWallet,
  TradeOrder,
  Trade,
  Transfer,
};

// Run all associate methods to set up relationships
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
