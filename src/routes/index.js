const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/coins", require("./coinRoutes"));
router.use("/trade-orders", require("./tradeOrderRoutes"));
router.use("/trades", require("./tradeRoutes"));
router.use("/transfers", require("./transferRoutes"));

module.exports = router;
