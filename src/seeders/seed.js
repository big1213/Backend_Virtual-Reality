const { sequelize, User, Coin, FiatCurrency, CryptoWallet, FiatWallet, TradeOrder, Trade, Transfer } = require("../models");

async function seed() {
  await sequelize.sync({ force: true });
  console.log("Database synced.");

  // --- Coins ---
  const [btc, eth, xrp, doge] = await Coin.bulkCreate([
    { coin_symbol: "BTC", coin_name: "Bitcoin" },
    { coin_symbol: "ETH", coin_name: "Ethereum" },
    { coin_symbol: "XRP", coin_name: "Ripple" },
    { coin_symbol: "DOGE", coin_name: "Dogecoin" },
  ]);
  console.log("Coins seeded.");

  // --- Fiat Currencies ---
  const [thb, usd] = await FiatCurrency.bulkCreate([
    { fiat_symbol: "THB", fiat_name: "Thai Baht" },
    { fiat_symbol: "USD", fiat_name: "US Dollar" },
  ]);
  console.log("Fiat currencies seeded.");

  // --- Users ---
  const [somchai, malee, john] = await User.bulkCreate([
    { username: "somchai", email: "somchai@email.com", password_hash: "hashed_pw_1", phone: "0812345678", kyc_status: "VERIFIED" },
    { username: "malee", email: "malee@email.com", password_hash: "hashed_pw_2", phone: "0898765432", kyc_status: "VERIFIED" },
    { username: "john_doe", email: "john@email.com", password_hash: "hashed_pw_3", phone: "0855551234", kyc_status: "PENDING" },
  ]);
  console.log("Users seeded.");

  // --- Crypto Wallets ---
  await CryptoWallet.bulkCreate([
    { user_id: somchai.user_id, coin_id: btc.coin_id, balance: 0.5, wallet_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    { user_id: somchai.user_id, coin_id: eth.coin_id, balance: 2.0, wallet_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f" },
    { user_id: malee.user_id, coin_id: btc.coin_id, balance: 1.2, wallet_address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2" },
    { user_id: malee.user_id, coin_id: doge.coin_id, balance: 50000.0, wallet_address: "0xDOGE_ADDR_malee_001" },
    { user_id: john.user_id, coin_id: btc.coin_id, balance: 0.0, wallet_address: "1NXYoJ5xU91Jp83XfVMHwwTUyZFK64BoAD" },
  ]);
  console.log("Crypto wallets seeded.");

  // --- Fiat Wallets ---
  await FiatWallet.bulkCreate([
    { user_id: somchai.user_id, fiat_id: thb.fiat_id, balance: 150000.0 },
    { user_id: malee.user_id, fiat_id: thb.fiat_id, balance: 500000.0 },
    { user_id: john.user_id, fiat_id: usd.fiat_id, balance: 5000.0 },
  ]);
  console.log("Fiat wallets seeded.");

  // --- Trade Orders ---
  const sellOrder = await TradeOrder.create({
    user_id: malee.user_id, coin_id: btc.coin_id, fiat_id: thb.fiat_id,
    order_type: "SELL", price_per_coin: 1050000.0, amount: 0.5, total_fiat: 525000.0, status: "MATCHED",
  });
  const buyOrder = await TradeOrder.create({
    user_id: somchai.user_id, coin_id: btc.coin_id, fiat_id: thb.fiat_id,
    order_type: "BUY", price_per_coin: 1050000.0, amount: 0.5, total_fiat: 525000.0, status: "MATCHED",
  });
  console.log("Trade orders seeded.");

  // --- Trades ---
  await Trade.create({
    buy_order_id: buyOrder.order_id, sell_order_id: sellOrder.order_id,
    buyer_id: somchai.user_id, seller_id: malee.user_id,
    coin_id: btc.coin_id, amount: 0.5, price_per_coin: 1050000.0, total_fiat: 525000.0,
  });
  console.log("Trades seeded.");

  // --- Transfers ---
  await Transfer.bulkCreate([
    {
      sender_id: somchai.user_id, receiver_id: john.user_id, coin_id: btc.coin_id,
      amount: 0.1, to_address: "1NXYoJ5xU91Jp83XfVMHwwTUyZFK64BoAD",
      transfer_type: "INTERNAL", status: "SUCCESS", fee: 0.0,
    },
    {
      sender_id: malee.user_id, receiver_id: null, coin_id: btc.coin_id,
      amount: 0.3, to_address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
      transfer_type: "EXTERNAL", status: "SUCCESS", fee: 0.0005,
    },
  ]);
  console.log("Transfers seeded.");

  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
