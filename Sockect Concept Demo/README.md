# Steps

## 1. Setting up environment
- `npm init`
- `npm install --save express socket.io`
- One final thing is that we should keep restarting the server. When we make changes, we will need a tool called nodemon.
    - `npm install --save-dev -g nodemon`
    - Whenever you need to start the server, `instead of using the node app.js use, nodemon app.js`. This will ensure that you do not need to restart the server whenever you change a file. It speeds up the development process.

## to run the server
- `use nodemon app.js` instead of `npm app.js`


## 2. require('socket.io')(http)
- The require('socket.io')(http) **creates a new socket.io instance attached to the http server**.

## 3. The io.on event handler handles connection, disconnection, etc., events in it, using the socket object.
- We have set up our server to log messages on connections and disconnections.
-  We now have to **include the client script and initialize the socket object there**, so that clients can establish connections when required. The script is served by our io server at '/socket.io/socket.io.js'.