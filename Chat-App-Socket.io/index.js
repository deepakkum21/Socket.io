var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 8888;

app.get('/', function (req, res) {
    //res.sendfile('index.html');
    res.sendFile(__dirname + '/index.html');
})

const getUsers = () => {
    let clients = io.sockets.clients().connected;
    //console.log('Clients: ', clients);
    let sockets = Object.values(clients);
    //console.log('sockets: ',sockets);
    users = sockets.map(s => s.user);
    //console.log('users: ', users);
    return users;
}

const emitUsers = () => {
    io.emit('users', getUsers());
}

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('new_user', user => {
        console.log('New User: ', user);

        socket.user = user;
        emitUsers();
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        emitUsers();
    });
});

http.listen(port, function () {
    console.log(`listening on *:${port}`);
})