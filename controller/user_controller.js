const users = require("../model/user_model");
const response = require("../response");

//Create
exports.createUser = async (req) => {
  try {
    const userCreate = new users({
      role: req.body.role,
      name: req.body.name,
      isOnline: req.body.isOnline,
    });
    const saveUser = await userCreate.save();
    return saveUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//All user data
exports.getAllUser = async (res) => {
  try {
    const user = await users.find();
    res.send(user);
    // return user;
  } catch (error) {
    res.send(error.message);
    // return null;
  }
};

//Show single user
exports.getUserById = async (userId) => {
  try {
    const user = await users.findById(userId);
    return user;
  } catch (error) {
    return null;
  }
};

//Update user data
exports.updateUserData = async (userId) => {
  try {
    const updateUsers = {
      isOnline: true,
    };

    const updateUser = await users.findByIdAndUpdate(userId, updateUsers, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//update
exports.updateUser = async (userId) => {
  try {
    const updateUsers = {
      isOnline: false,
    };

    const updateUser = await users.findByIdAndUpdate(userId, updateUsers, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//Delete user data
exports.deleteUserData = async (userId) => {
  try {
    const deleteUser = await users.findByIdAndDelete(userId);
    return deleteUser;
  } catch (error) {
    return null;
  }
};
