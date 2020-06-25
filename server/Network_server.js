const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(5000, function () {
    console.log('server is listening on port 5000');
});
const io = socket(server);
const users_array = [];
io.on("connection", function (socket_connect) {
    socket_connect.on("user_connect", function (user_name) {
        users_array.push({ name: user_name, id: socket_connect.id });
        for (let index = 0; index < users_array.length; index++) {
            io.to(users_array[index].id).emit("getUsers", users_array);
        }
    });
    socket_connect.on("my_id", function (name) {
        io.to(socket_connect.id).emit("my_id", { user_name: name, my_socket_id: socket_connect.id });
    });
    socket_connect.on("message", (data) => {
        io.to(data.recive_message).emit("new_message", { message: data.send_message, sender_id: socket_connect.id });
    })
});
