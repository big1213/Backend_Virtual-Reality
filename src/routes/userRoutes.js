const router = require("express").Router();
const ctrl = require("../controllers/userController");

router.get("/", ctrl.getAllUsers);
router.get("/:id", ctrl.getUserById);
router.post("/", ctrl.createUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;
