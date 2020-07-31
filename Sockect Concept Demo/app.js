const app = require('express')();
const http = require('http').Server(app);

// home route '/'
app.get('/', function(req, res) {
    res.sendfile('index.html');
 });


http.listen(3000, function() {
    console.log('listening on *:3000');
 });