import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
   const [input, setInput] = useState('');
   const [responses, setResponses] = useState([]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/chatgpt', {input});
      setResponses([...responses, { input, response: res.data }]);      
      setInput(''); // clear input field after submitting
    } catch(err) {
      console.error(err);
      setResponses([...responses, { input, response: 'Error: ' + err.message }]);
    }
   }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatGPT by SAMAD</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='user-input'>
            enter your prompt here:
          </label>
          <input 
            id='user-input'
            type = 'text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type='submit'>Submit</button>
        </form>

        <div id='responses'>
          <h2>Responses</h2>
          {responses.map((item, index)=>(
            <div key={index}>

              <p>{item.input}</p>

              <p>{item.response}</p>

            </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default App
