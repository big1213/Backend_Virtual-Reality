const { User, CryptoWallet, FiatWallet, Coin, FiatCurrency } = require("../models");

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password_hash"] },
      include: [
        { model: CryptoWallet, as: "cryptoWallets", include: [{ model: Coin, as: "coin" }] },
        { model: FiatWallet, as: "fiatWallets", include: [{ model: FiatCurrency, as: "currency" }] },
      ],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { username, email, password_hash, phone } = req.body;
    const user = await User.create({ username, email, password_hash, phone });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
