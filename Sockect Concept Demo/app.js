const app = require('express')();
const http = require('http').Server(app);

// The require('socket.io')(http) creates a new socket.io instance attached to the http server.
var io = require('socket.io')(http);

// home route '/'
app.get('/', function (req, res) {
    res.sendfile('index.html');
});


//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});