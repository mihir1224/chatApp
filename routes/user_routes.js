const router = require("express").Router();
const userController = require("../controller/user_controller");
const auth = require("../src/index");

router.post("/create", userController.createUser);
router.get("/getAll", auth.auth, userController.getAllUser);
router.get("/getById/:userId", userController.getUserById);
router.put("/update/:userId", userController.updateUserData);
router.delete("/delete/:userId", userController.deleteUserData);

module.exports = router;
