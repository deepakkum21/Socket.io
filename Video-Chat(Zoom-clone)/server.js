const express = require('express');
const app = express();
const server  = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// for making the use of static files wahich are in public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.status(200).send("<h1>Hello World</h1>");
    // res.render('room');

    res.redirect(`${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

io.on('connection', socket => {
    socket.on('join-room', (roomID) => {
        console.log('Joined the room',roomID);
        socket.join(roomID);

        // after joining the room broadcast the message to all expect who joins
        socket.to(roomID).broadcast.emit('user-connected', roomID);
    })
})

server.listen(PORT, () => {    
    console.log(`The server is running on port ${PORT}`);
});