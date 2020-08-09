import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  //console.log(messages);

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])  // condition on which it should execute, blank means once it will execute


  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc =>
          ({ id: doc.id, message: doc.data() })
        ))
      })
  }, [])

  const sendMessages = (event) => {
    // to prevent the default behaviour which is refereshing
    // when ever the eneter button is pressed for a form as for m tend sto submit and refreshes the screen
    event.preventDefault();

    // adding to db
    db.collection('messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessages([...messages, { username: username, message: input }]);
    setInput('');
  }

  return (
    <div className="App">
      <form className="app__form">
        <FormControl className="app__formControl">
          {/* <InputLabel >Enter your message here ....</InputLabel> */}
          <Input className="app__input" value={input} onChange={event => setInput(event.target.value)} />
          {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessages}>Send Message</Button> */}

          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessages}>
            <SendIcon/>
          </IconButton>

        </FormControl>
      </form>
      {/* <form>
        <input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessages}>Send Message</Button>
      </form> */}

      <FlipMove>
        {messages.map(({ message, id }) =>
          <Message key={id} username={username} message={message}></Message>
          // <p key={index}>{message}</p>
        )}
      </FlipMove>
    </div>
  );
}

export default App;
