console.log("app is loading");

const socket = require('socket.io');
const express = require("express");
const app = express();
const routHelper = require('./routHelper');

app.use(express.json());
app.post("/users/register", (req, res) => {
  routHelper.register(req, res);
});
app.post("/users/login", (req, res) => {
  routHelper.login(req, res);
  console.log(req.user);
});
app.post("/contact_us", (req, res) => {
  routHelper.contactUs(req, res);
});
app.get("/users", (req, res) => {
  routHelper.getUsers(req, res);
});
app.post("/users/addMeetup", (req, res) => {
  routHelper.createmeetup(req, res);
});
app.get("/users/ShowAllMeetups", (req, res) => {
  routHelper.ShowAllMeetups(req, res);
});
app.delete("/users/delete", (req, res) => {
  routHelper.deleteMeetup(req, res);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(5000, function () {
  console.log(`server is listening on port ${PORT}`);
});

const io = socket(server);
const users_array = [];

io.on("connection", function (socket_connect) {
  socket_connect.on("user_connect", function (user_name) {
    users_array.push({ name: user_name, id: socket_connect.id 
    });
    for (let index = 0; index < users_array.length; index++) {
      const element_users = users_array[index];
      io.to(users_array[index].id).emit("getUsers", users_array);
    }
  });

  socket_connect.on("my_id", function (name) {
    io.to(socket_connect.id).emit("my_id", { user_name: name, my_socket_id: socket_connect.id });
  });
  socket_connect.on("message", (data) => {
    io.to(data.recive_message).emit("new_message", { message: data.send_message, sender_id: socket_connect.id });
  });
});

const users_network_array = [];
io.on("connection", function (socket) {
  socket.on("user_connecting", function (user_name) {
    users_network_array.push({ name: user_name, id: socket.id });
    for (let index = 0; index < users_network_array.length; index++) {
      const element_users = users_network_array[index];
      io.to(users_network_array[index].id).emit("get_user", users_network_array);
    }
  });
  socket.on("user_id", function (name) {
    io.to(socket.id).emit("user_id", { user_name: name, user_id: socket.id });
  });
  socket.on("message", (data) => {
    io.to(data.recive_message).emit("chat_msg", { message: data.send_message, sender_id: socket.id });
  });
  socket.on("message", (data) => {
    io.to(data.recive_message).emit("chat_msg", { message: data.send_message, sender_id: socket.id });
  })
  socket.on('chat2', function (data) {
    io.sockets.emit('chat2', data);
  });
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});



