import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState(null);  // State to store the response

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/add`, {
        params: {
          a: input1,
          b: input2,
          p: input3
        }
      });
      console.log('Response:', response.data);
      setResult(response.data.result);  // Set the result state to the response data
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Unable to fetch data');  // Handle error in result
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)} />
        <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)} />
        <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)} />
        <button type="submit">Send Request</button>
      </form>
      {result !== null && <p>Result: {result}</p>}  {/* Conditionally render the result */}
    </div>
  );
}

export default App;
