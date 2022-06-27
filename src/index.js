const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const usersControllers = require("../controller/user_controller");

// const Filter = require("bad-words");

//configure
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.poxhu.mongodb.net/books",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Database connected");
  }
);

io.on("connection", async (socket) => {
  console.log("new connection");

  let user = await usersControllers.getUserById(socket.handshake.query.userId);
  console.log(user);

  if (user) {
    let Users = await usersControllers.updateUserData(user._id);
    console.log(Users);
  } else {
    console.log(false);
  }

  if (user.role == "admin") {
    let users = await usersControllers.getUserById(user._id);
    console.log(users);
    console.log("User can access");
  } else {
    console.log("User can't access");
  }

  // socket.emit("message", "welcome");
  // socket.broadcast.emit("message", "A new user has joined!");
  // });

  socket.on("sendNotification", async (message, callback) => {
    console.log("abcd");
    if (message._id) {
      io.emit("notification", message.data);
      callback(message);
    } else {
      console.log("frdefvdrsv");
    }
  });

  socket.on("disconnect", async () => {
    let userUpdates = await usersControllers.updateUser(user._id);
    console.log(userUpdates);

    socket.broadcast.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
