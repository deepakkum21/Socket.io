// const express = require('express');
// const socketio = require('socket.io');
// const http = require('http');

// const router = require('./router');

// const PORT = process.env.PORT || 5000;

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// app.use(router);

// io.on('connect', (socket) => {
//     console.log('Just now a new client connected!!!!');

//     socket.on('disconnect', () => {
//         console.log('Sad to see a client disconnected. Hope to see them back soon!!!!!!!!');
//     })
// })

// app.listen(PORT , () => {
//     console.log(`Server started at Port: ${PORT}`);
// })



const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { use } = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    console.log('Just now a new client connected!!!!');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) {
            return callback(error);
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.room);

        callback();
    });


    // waiting for the sendmessage event sent from UI
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('Sad to see a client disconnected. Hope to see them back soon!!!!!!!!');
    });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));