import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState(null);  // State to store the response from /add
  const [plot, setPlot] = useState(null);  // State to store the plot image from /plot

  // Function to handle /add request
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/add`, {
        params: {
          a: Number(input1),
          b: Number(input2),
          p: Number(input3)
        }
      });
      console.log('Add Response Data:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Unable to fetch data');
    }
  };

  // Function to handle /plot request
  const handlePlot = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/plot`, {
        params: {
          a: Number(input1),
          b: Number(input2),
          p: Number(input3)
        }
      });
      console.log('Plot Response Data:', response.data);
      setPlot(response.data);  // Set the plot data as HTML content
    } catch (error) {
      console.error('Error:', error);
      setPlot('Error: Unable to fetch plot');
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)} />
        <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)} />
        <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)} />
        <button type="submit">Get Result</button>
      </form>

      {result !== null && <p>Result: {result}</p>}  {/* Display result from /add */}

      <button onClick={handlePlot}>Generate Plot</button> {/* Button to trigger plot generation */}

      {/* Conditionally render the plot if available */}
      {plot && (
        <div>
          <h3>Generated Plot:</h3>
          <div dangerouslySetInnerHTML={{ __html: plot }} />
        </div>
      )}
    </div>
  );
}

export default App;
