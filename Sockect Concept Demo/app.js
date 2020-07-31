const app = require('express')();
const http = require('http').Server(app);

// The require('socket.io')(http) creates a new socket.io instance attached to the http server.
var io = require('socket.io')(http);

// home route '/'
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var clients = 0;

io.on('connection', function(socket) {
    clients++;

    // broadcast event
    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});

    socket.on('disconnect', function () {
       clients--;
       io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
    });
 });


// //Whenever someone connects this gets executed
// io.on('connection', function (socket) {
//     console.log('A user connected');

//     //Send a message after a timeout of 4seconds
//     setTimeout(function () {
//         socket.send('Sent a message 4 seconds after connection!');
//     }, 4000);


//     // using custom event
//     //Send a message when 
//     setTimeout(function () {
//         //Sending an object when emmiting an event
//         socket.emit('testerCustomEvent', { description: 'A custom event named testerEvent!' });
//     }, 8000);


//     // To handle client events, use the on function on the socket object on your server.
//     socket.on('clientEvent', function (data) {
//         console.log(data);
//     });

//     //Whenever someone disconnects this piece of code executed
//     socket.on('disconnect', function () {
//         console.log('A user disconnected');
//     });
// });


http.listen(3000, function () {
    console.log('listening on *:3000');
});