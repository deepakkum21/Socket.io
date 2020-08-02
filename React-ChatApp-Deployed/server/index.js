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

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    console.log('Just now a new client connected!!!!');

    socket.on('join', ({ name, room }) => {
        console.log(name, room);
    });

    socket.on('disconnect', () => {
        console.log('Sad to see a client disconnected. Hope to see them back soon!!!!!!!!');
    });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));