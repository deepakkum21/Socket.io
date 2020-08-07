const express = require('express');
const app = express();
const server  = require('http').Server(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send("<h1>Hello World</h1>");
});

server.listen(PORT, () => {    
    console.log(`The server is running on port ${PORT}`);
});