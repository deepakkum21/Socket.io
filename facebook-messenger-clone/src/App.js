import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  //console.log(messages);

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])  // condition on which it should execute, blank means once it will execute


  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => 
        doc.data()
      ))
    })
  }, [])

  const sendMessages = (event) => {
    // to prevent the default behaviour which is refereshing
    // when ever the eneter button is pressed for a form as for m tend sto submit and refreshes the screen
    event.preventDefault();

    setMessages([...messages, { username: username, message : input }]);
    setInput('');
  }

  return (
    <div className="App">
      <FormControl>
        <InputLabel >Enter your message here ....</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessages}>Send Message</Button>
      </FormControl>
      {/* <form>
        <input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessages}>Send Message</Button>
      </form> */}
      {messages.map((message, index) =>
        <Message key={index} username={username} message={message}></Message>
        // <p key={index}>{message}</p>
      )}
    </div>
  );
}

export default App;
