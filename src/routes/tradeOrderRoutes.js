const router = require("express").Router();
const ctrl = require("../controllers/tradeOrderController");

router.get("/", ctrl.getAllOrders);
router.get("/:id", ctrl.getOrderById);
router.post("/", ctrl.createOrder);
router.put("/:id/cancel", ctrl.cancelOrder);

module.exports = router;
