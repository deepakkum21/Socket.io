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


# A. Socket.IO - Event Handling
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

# B. Socket.IO - Broadcasting
1. Broadcasting means **sending a message to all connected clients**. 
2. Broadcasting can be d**one at multiple levels**. 
3. We can send the 
    - **message to all the connected clients**, 
    - **to clients on a namespace** and 
    - **clients in a particular room**. 
4. To **broadcast an event to all the clients**, we can use the `io.sockets.emit` method.
5. **Note** 
    − This will `emit the event to ALL the connected clients` (**even the socket that might have fired this event**).            

### In this example, we will broadcast the number of connected clients to all the users. Update the app.js file to incorporate the following.

### Server side
-                       var app = require('express')();
                        var http = require('http').Server(app);
                        var io = require('socket.io')(http);

                        app.get('/', function(req, res) {
                            res.sendfile('index.html');
                        });

                        var clients = 0;
                        io.on('connection', function(socket) {
                        clients++;
                        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
                            socket.on('disconnect', function () {
                                clients--;
                                io.sockets.emit('broadcast',{ description: clients + ' client connected!'});
                            });
                        });

                        http.listen(3000, function() {
                            console.log('listening on localhost:3000');
                        });


### client side
- On the client side, we just need to handle the broadcast event
-                       <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Hello world</title>
                        </head>
                        <script src = "/socket.io/socket.io.js"></script>
                        <script>
                            var socket = io();
                            socket.on('broadcast',function(data) {
                                document.body.innerHTML = '';
                                document.write(data.description);
                            });
                        </script>
                            <body>
                                Hello world
                            </body>
                        </html>

### Sending a broadcast event to other client not to the client which caused the event
- The above example was to send an event to everyone. 
- Now, **if we want to send an event to everyone, but the client that caused it** (in the previous example, it was caused by new clients on connecting), 
    - we can use the `socket.broadcast.emit.`
### example2: Let us send the new user a welcome message and update the other clients about him/her joining. So in your app.js file, on connection of client send him a welcome message and broadcast connected client number to all others.
- **server side app.js**
-                   var app = require('express')();
                    var http = require('http').Server(app);
                    var io = require('socket.io')(http);

                    app.get('/', function(req, res) {
                        res.sendfile('index.html');
                    });

                    var clients = 0;
                    io.on('connection', function(socket) {
                        clients++;
                        socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
                        socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
                        socket.on('disconnect', function () {
                            clients--;
                            socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
                        });
                    });

                    http.listen(3000, function() {
                        console.log('listening on localhost:3000');
                    });

- **Client side index.html**
-               <!DOCTYPE html>
                <html>
                    <head>
                        <title>Hello world</title>
                    </head>
                    <script src = "/socket.io/socket.io.js"></script>
                    <script>
                        var socket = io();
                        socket.on('newclientconnect',function(data) {
                            document.body.innerHTML = '';
                            document.write(data.description);
                        });
                    </script>
                    <body>Hello world</body>
                </html>



# C. Socket.IO - Namespaces
1. `Socket.IO allows you to “namespace”` your sockets, which **essentially means assigning different endpoints or paths**. 
2. This is a **useful feature to minimize the number of resources** (TCP connections) and at the same time separate concerns within your application by introducing separation between communication channels
3. **Multiple namespaces actually share the same WebSockets connection** thus saving us socket ports on the server.
4. `Namespaces are created on the server side`. However, they are joined by clients by sending a request to the server.

## C.1. Default Namespaces
- The `root namespace '/' is the default namespace`, which is **joined by clients if a namespace is not specified by the client while connecting to the server**.
- All connections to the server using the socket-object client side are made to the default namespace.
- `var socket = io();`
- This **will connect the client to the default namespace**.
- All events on this namespace connection will be handled by the io object on the server.

## C.2. Custom Namespaces
- To set `up a custom namespace, we can call the ‘of’ function on the server side` −
- **server side**
-               var app = require('express')();
                var http = require('http').Server(app);
                var io = require('socket.io')(http);

                app.get('/', function(req, res) {
                    res.sendfile('index.html');
                });

                var nsp = io.of('/my-namespace');
                nsp.on('connection', function(socket) {
                    console.log('someone connected');
                    nsp.emit('hi', 'Hello everyone!');
                });

                http.listen(3000, function() {
                    console.log('listening on localhost:3000');
                });

- **client side**
- Now, to connect a client to this namespace, you **need to provide the namespace as an argument to the `io constructor call` to create a connection** and a socket object on client side.                
-               <!DOCTYPE html>
                <html>
                    <head>
                        <title>Hello world</title>
                    </head>
                    <script src = "/socket.io/socket.io.js"></script>
                    
                    <script>
                        var socket = io('/my-namespace');
                        socket.on('hi',function(data) {
                            document.body.innerHTML = '';
                            document.write(data);
                        });
                    </script>
                    <body></body>
                </html>


# D. Socket.IO - Rooms                
1. **Within each namespace**, you can also define **arbitrary channels** that sockets can join and leave. 
2. These **channels are called rooms**. Rooms are used to further-separate concerns.
3. Rooms **also share the same socket connection like namespaces**.
4. One thing to keep in mind while `using rooms is that they can only be joined on the server side`.

## D.1. Joining Rooms
- You can **`call the join method` on the socket to subscribe the socket to a given channel/room**. 
- For example, let us create rooms called `'room-<room-number>'` and join some clients. 
- **As soon as this room is full, create another room and join clients** there.
- Note − We are **currently doing this on the default namespace, i.e. '/'**. You can also implement this in custom namespaces in the same fashion.
- **To join a room you need to `provide the room name as the argument to your join function call`**

- **server side app.js
-               var app = require('express')();
                var http = require('http').Server(app);
                var io = require('socket.io')(http);

                app.get('/', function(req, res) {
                    res.sendfile('index.html');
                });

                var roomno = 1;
                io.on('connection', function(socket) {
                
                    //Increase roomno if 2 clients are present in a room.
                    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
                        roomno++;
                    }
                    socket.join("room-"+roomno);

                    //Send this event to everyone in the room.
                    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
                })

                http.listen(3000, function() {
                    console.log('listening on localhost:3000');
                });

- **client side index.html**
-               <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Hello world</title>
                    </head>
                    <script src = "/socket.io/socket.io.js"></script>
                    
                    <script>
                        var socket = io();
                        socket.on('connectToRoom',function(data) {
                            document.body.innerHTML = '';
                            document.write(data);
                        });
                    </script>
                    <body></body>
                </html>
