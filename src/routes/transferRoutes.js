const router = require("express").Router();
const ctrl = require("../controllers/transferController");

router.get("/", ctrl.getAllTransfers);
router.get("/:id", ctrl.getTransferById);
router.post("/", ctrl.createTransfer);

module.exports = router;
