const { Coin } = require("../models");

// GET /api/coins
exports.getAllCoins = async (req, res) => {
  try {
    const coins = await Coin.findAll();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/coins/:id
exports.getCoinById = async (req, res) => {
  try {
    const coin = await Coin.findByPk(req.params.id);
    if (!coin) return res.status(404).json({ error: "Coin not found" });
    res.json(coin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/coins
exports.createCoin = async (req, res) => {
  try {
    const coin = await Coin.create(req.body);
    res.status(201).json(coin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
