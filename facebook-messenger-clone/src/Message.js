import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';
import React, { forwardRef } from 'react';


const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;

    return (
        // <div>
        //     <h1>{props.username}: {props.text}</h1>
        // </div>
        <div ref={ref} className={`message__card ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__usercard" : "message_guestcard"}>
                <CardContent>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        component="h2"
                    >
                        { !isUser && `${message.username || 'anonymous user'}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;