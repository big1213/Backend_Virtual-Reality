const { TradeOrder, User, Coin, FiatCurrency } = require("../models");

// GET /api/trade-orders
exports.getAllOrders = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.order_type) where.order_type = req.query.order_type;

    const orders = await TradeOrder.findAll({
      where,
      include: [
        { model: User, as: "user", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
        { model: FiatCurrency, as: "fiatCurrency" },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/trade-orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await TradeOrder.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
        { model: FiatCurrency, as: "fiatCurrency" },
      ],
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/trade-orders
exports.createOrder = async (req, res) => {
  try {
    const { user_id, coin_id, fiat_id, order_type, price_per_coin, amount } = req.body;
    const total_fiat = (price_per_coin * amount).toFixed(2);
    const order = await TradeOrder.create({
      user_id, coin_id, fiat_id, order_type, price_per_coin, amount, total_fiat,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/trade-orders/:id/cancel
exports.cancelOrder = async (req, res) => {
  try {
    const order = await TradeOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "OPEN") {
      return res.status(400).json({ error: "Only OPEN orders can be cancelled" });
    }
    await order.update({ status: "CANCELLED" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
