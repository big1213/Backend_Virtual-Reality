const router = require("express").Router();
const ctrl = require("../controllers/tradeController");

router.get("/", ctrl.getAllTrades);
router.get("/:id", ctrl.getTradeById);

module.exports = router;
