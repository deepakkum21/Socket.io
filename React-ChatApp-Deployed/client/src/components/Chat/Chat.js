import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    let socket = '';
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // socket.emit('join',{ name:name, room: room});
        // using ES6 syntax for above code
        socket.emit('join', { name, room }, () => {

        });


        // cleanup for useEffect like component unmount
        return () => {
            socket.emit('disconnect');

            socket.off();
        };

    },
        // this is passed to avoid two times connection and this is only run when list values will change
        [ENDPOINT, location.search])
    return (
        <h1> Chat </h1>
    )
}

export default Chat;