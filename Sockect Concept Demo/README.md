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


# Socket.IO - Event Handling
## Sockets work based on events. 
 - There are some reserved events, which can be accessed using the socket object on 
 
### 1. the server side socket events are −
- `Connect`
- `Message`
- `Disconnect`
- `Reconnect`
- `Ping`
- `Join` and
- `Leave`

### 2. The client-side socket object also provides us with some reserved events, which are −
- `Connect`
- `Connect_error`
- `Connect_timeout`
- `Reconnect` etc

### inbuilt message event from server
-           //Send a message after a timeout of 4seconds
            setTimeout(function() {
                socket.send('Sent a message 4seconds after connection!');
            }, 4000);

### inbuilt message event handle in client side
-           <script>
                var socket = io();
                socket.on('message', function(data){document.write(data)});
            </script>

### custom event using emit from server side
- Socket.IO provides us the ability to create custom events.
- You can `create and fire custom events using the socket.emit function`
-           //Sending an object when emmiting an event
            socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});

### handling custom event on client side
- To handle this custom event on client we need a listener that listens for the event testerEvent.
-           var socket = io();
            socket.on('testerEvent', function(data){document.write(data.description)});    

### also emit events from the client. 
- To emit an event from your client, use the emit function on the socket object.
-    `socket.emit('clientEvent', 'Sent an event from the client!');`

### To handle these events, use the on function on the socket object on your server.
-           socket.on('clientEvent', function(data) {
                console.log(data);
            });
