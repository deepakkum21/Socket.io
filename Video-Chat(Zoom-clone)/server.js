const express = require('express');
const app = express();
const server  = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');

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

server.listen(PORT, () => {    
    console.log(`The server is running on port ${PORT}`);
});