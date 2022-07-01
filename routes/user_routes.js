const router = require("express").Router();
const userController = require("../controller/user_controller");

router.post("/create", userController.createUser);
router.get("/getAll", userController.getAllUser);
router.get("/getById/:userId", userController.getUserById);
router.put("/update/:userId", userController.updateUserData);
router.delete("/delete/:userId", userController.deletedUser);

module.exports = router;
