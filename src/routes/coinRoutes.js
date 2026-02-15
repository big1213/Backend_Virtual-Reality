const router = require("express").Router();
const ctrl = require("../controllers/coinController");

router.get("/", ctrl.getAllCoins);
router.get("/:id", ctrl.getCoinById);
router.post("/", ctrl.createCoin);

module.exports = router;
