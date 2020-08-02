const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
    console.log('Just now a new client connected!!!!');

    socket.on('disconnect', () => {
        console.log('Sad to see a client disconnected. Hope to see them back soon!!!!!!!!'); 
    })
})

app.listen(PORT , () => {
    console.log(`Server started at Port: ${PORT}`);
})