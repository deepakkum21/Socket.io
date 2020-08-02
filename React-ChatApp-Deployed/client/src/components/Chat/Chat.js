// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from "socket.io-client";

// const Chat = ({ location }) => {
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     let socket;
//     const ENDPOINT = 'localhost:5000';

//     useEffect(() => {
//         const { name, room } = queryString.parse(location.search);

//         socket = io(ENDPOINT);

//         setName(name);
//         setRoom(room);

//         // socket.emit('join',{ name:name, room: room});
//         // using ES6 syntax for above code
//         socket.emit('join', { name, room }, () => {

//         });


//         // cleanup for useEffect like component unmount
//         return () => {
//             socket.emit('disconnect');

//             socket.off();
//         };

//     }, [ENDPOINT, location.search]);     // this is passed to avoid two times connection and this is only run when list values will change


//     useEffect(() => {
//         socket.on('message', message => {
//             setMessages(messages => [...messages, message]);
//         });

//         // socket.on("roomData", ({ users }) => {
//         //     setUsers(users);
//         // });
//     });


//     const sendMessage = (event) => {
//         event.preventDefault();

//         if (message) {
//             socket.emit('sendMessage', message, () => setMessage(''));
//         }
//     }

//     console.log(message, messages);

//     return (
//         <div className="outerContainer">
//             <div className="container">
//                 {/* <InfoBar room={room} />
//                 <Messages messages={messages} name={name} /> */}
//                 {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
//                 <input
//                     value={message}
//                     onChange={(event) => setMessage(event.target.value) }
//                     onKeyPress={(event) => event.target.value === 'Enter' ? sendMessage() : null }
//                 >
//                 </input>
//             </div>
//             {/* <TextContainer users={users} /> */}
//         </div>
//     )
// }

// export default Chat;


import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        // socket.emit('join',{ name:name, room: room});
        // using ES6 syntax for above code
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]); // this is passed to avoid two times connection and this is only run when list values will change

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );
}

export default Chat;