// const { response } = require("express");
const users = require("../model/user_model");
const { generate } = require("../response");

//create
exports.createUser = async (message, callback) => {
  let response;
  try {
    const newUser = new users(message);
    const savedUser = await newUser.save();
    response = generate(false, "User created successfully", savedUser);
  } catch (error) {
    response = generate(true, error.message);
  }
  if (callback) {
    callback(response);
  }
};

//getUserById
exports.getUserById = async (userId) => {
  try {
    return await users.findById(userId);
  } catch (error) {
    return null;
  }
};

//All user data
exports.getAllUser = async (callback) => {
  let response;
  try {
    const user = await users.find();
    response = generate(false, "User fetched successfully", user);
  } catch (error) {
    response = generate(true, error.message);
  }
  if (callback) {
    callback(response);
  }
};

//updatedUserData
exports.updateUserData = async (userId, userData, callback) => {
  let response;
  try {
    const userUpdate = await users.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    response = generate(false, "User updated successfully", userUpdate);
  } catch (error) {
    response = generate(true, error.message);
  }
  if (callback) {
    callback(response);
  }
};

//updatedIsOnline
exports.updatedIsOnline = async (userId, flag) => {
  try {
    const userUpdate = await users.findByIdAndUpdate(userId, {
      isOnline: flag,
    });
    console.log(userUpdate);
    return userUpdate;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//deletedUser
exports.deletedUser = async (userId, callback) => {
  let response;
  try {
    const userDelete = await users.findByIdAndDelete(userId);
    response = generate(false, "User deleted successfully", userDelete);
  } catch (error) {
    response = generate(true, error.message);
  }
  if (callback) {
    callback(response);
  }
};
