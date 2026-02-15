const { Trade, TradeOrder, User, Coin } = require("../models");

// GET /api/trades
exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.findAll({
      include: [
        { model: User, as: "buyer", attributes: ["user_id", "username"] },
        { model: User, as: "seller", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
      ],
      order: [["traded_at", "DESC"]],
    });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/trades/:id
exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id, {
      include: [
        { model: User, as: "buyer", attributes: ["user_id", "username"] },
        { model: User, as: "seller", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
        { model: TradeOrder, as: "buyOrder" },
        { model: TradeOrder, as: "sellOrder" },
      ],
    });
    if (!trade) return res.status(404).json({ error: "Trade not found" });
    res.json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
