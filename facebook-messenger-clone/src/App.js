import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {

  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);

  //console.log(messages);

  const sendMessages = (event) => {
    // to prevent the default behaviour which is refereshing
    // when ever the eneter button is pressed for a form as for m tend sto submit and refreshes the screen
    event.preventDefault();

    setMessages([...messages, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>App</h1>
      <form>
        <input value={input} onChange={event => setInput(event.target.value)} />
        <Button variant="contained" color="primary" type='submit' onClick={sendMessages}>Send Message</Button>
      </form>
      {messages.map((message, index) =>
        <p key={index}>{message}</p>
      )}
    </div>
  );
}

export default App;
