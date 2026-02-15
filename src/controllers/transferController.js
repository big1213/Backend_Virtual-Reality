const { Transfer, User, Coin } = require("../models");

// GET /api/transfers
exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      include: [
        { model: User, as: "sender", attributes: ["user_id", "username"] },
        { model: User, as: "receiver", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/transfers/:id
exports.getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findByPk(req.params.id, {
      include: [
        { model: User, as: "sender", attributes: ["user_id", "username"] },
        { model: User, as: "receiver", attributes: ["user_id", "username"] },
        { model: Coin, as: "coin" },
      ],
    });
    if (!transfer) return res.status(404).json({ error: "Transfer not found" });
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/transfers
exports.createTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.create(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
