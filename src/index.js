const path = require("path");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const usersControllers = require("../controller/user_controller");
const userModel = require("../model/user_model");
const { use } = require("../routes/user_routes");
const generate = require("../response");
const { response } = require("express");

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

  let user = await usersControllers.updatedIsOnline(
    socket.handshake.query.userId,
    true
  );

  const eventArray = ["createUser", "fetchUserId", "updateUser", "deleteUser"];

  socket.use((event, next) => {
    console.log(event);
    if (eventArray.includes(event[0])) {
      if (user.role === "admin") {
        next();
      } else {
        if (
          event[event.length - 1] &&
          event[event.length - 1] == typeof Function
        ) {
          event[event.length - 1](generate.generate(true, "error"));
        }
      }
    } else {
      next();
    }
  });

  socket.on("createUser", usersControllers.createUser);
  socket.on("fetchUserId", usersControllers.getAllUser);
  socket.on("updateUser", usersControllers.updateUserData);
  socket.on("deleteUser", usersControllers.deletedUser);

  socket.on("sendNotification", async (message) => {
    try {
      let connectedUsers = await io.fetchSockets();

      for (let i of connectedUsers) {
        let getUserID = i.handshake.query.userId;
        if (message._id.includes(getUserID)) {
          i.emit("notification", message.data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  socket.on("disconnect", async () => {
    let userUpdates = await usersControllers.updatedIsOnline(user._id, false);
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
