import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState(null);
  const [plot, setPlot] = useState(null);
  const [cayleyTable, setCayleyTable] = useState(null);

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
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Unable to fetch data');
    }
  };

  const handlePlot = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/plot`, {
        params: {
          a: Number(input1),
          b: Number(input2),
          p: Number(input3)
        }
      });
      setPlot(response.data);
    } catch (error) {
      console.error('Error:', error);
      setPlot('Error: Unable to fetch plot');
    }
  };

  const handleCayleyTable = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cayley_table`, {
        params: {
          a: Number(input1),
          b: Number(input2),
          p: Number(input3)
        }
      });
      setCayleyTable(response.data);
    } catch (error) {
      console.error('Error:', error);
      setCayleyTable('Error: Unable to fetch Cayley table');
    }
  };

  const handleDownloadCSV = () => {
    const params = new URLSearchParams({
      a: Number(input1),
      b: Number(input2),
      p: Number(input3),
    });
    window.location.href = `http://localhost:8000/download_cayley_table?${params.toString()}`;
  };

  return (
    <div style={styles.container}>
      {/* Nautical GIF at the top */}
      <img src="path/to/your/gif.gif" alt="Nautical animation" style={styles.gif} /> {/* Replace with your GIF path */}

      {/* Header */}
      <h1 style={styles.header}>ecmodp</h1>

      {/* Input form */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)} style={styles.input} placeholder="Enter a" />
        <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)} style={styles.input} placeholder="Enter b" />
        <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)} style={styles.input} placeholder="Enter p" />
        <button type="submit" style={styles.button}>Get Result</button>
      </form>

      {/* Result display */}
      {result && <p style={styles.result}>Result: {result}</p>}

      {/* Plot button and display */}
      <button onClick={handlePlot} style={styles.button}>Generate Plot</button>
      {plot && (
        <div>
          <h3 style={styles.subHeader}>Generated Plot:</h3>
          <div dangerouslySetInnerHTML={{ __html: plot }} />
        </div>
      )}

      {/* Cayley table button and display */}
      <button onClick={handleCayleyTable} style={styles.button}>Generate Cayley Table</button>
      {cayleyTable && (
        <div>
          <h3 style={styles.subHeader}>Cayley Table:</h3>
          <div dangerouslySetInnerHTML={{ __html: cayleyTable }} />
        </div>
      )}

      {/* CSV download button */}
      <button onClick={handleDownloadCSV} style={styles.button}>Download Cayley Table as CSV</button>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#d1d1d1', // Background color
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  gif: {
    width: '100px',
    marginBottom: '20px',
  },
  header: {
    fontSize: '3rem',
    fontWeight: '300',
    color: '#2190ff', // Title color to match button text color
    fontFamily: '"Century Gothic", "Avenir Light", sans-serif', // Title font
    textTransform: 'uppercase',
    letterSpacing: '2px', // Increased letter spacing
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px', // Slightly closer spacing between inputs
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '6px', // Reduced padding for a smaller input
    borderRadius: '6px',
    border: '1px solid #333',
    outline: 'none',
    width: '100%',
    maxWidth: '250px', // Reduced width for a smaller input
    fontSize: '0.9rem', // Slightly smaller font size
  },
  button: {
    padding: '8px 16px', // Smaller padding for a compact button
    marginTop: '12px', // Slightly reduced spacing between buttons
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e3e3e3', // Button background color
    color: '#2190ff', // Button text color
    fontSize: '1rem', // Slightly smaller font size
    fontFamily: 'Helvetica, sans-serif', // Button font
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s, background 0.3s',
  },
  result: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e0f2f1',
    color: '#005f73',
    fontSize: '1.2rem',
  },
  subHeader: {
    color: '#2190ff', // Subheader color to match buttons and header
    fontSize: '1.5rem',
  },
};

export default App;





// Switch on for ghetto mode ....

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [input3, setInput3] = useState('');
//   const [result, setResult] = useState(null);
//   const [plot, setPlot] = useState(null);
//   const [cayleyTable, setCayleyTable] = useState(null);  // State for Cayley table image

//   // Function to handle /add request
//   const handleAdd = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:8000/add`, {
//         params: {
//           a: Number(input1),
//           b: Number(input2),
//           p: Number(input3)
//         }
//       });
//       setResult(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//       setResult('Error: Unable to fetch data');
//     }
//   };

//   // Function to handle /plot request
//   const handlePlot = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/plot`, {
//         params: {
//           a: Number(input1),
//           b: Number(input2),
//           p: Number(input3)
//         }
//       });
//       setPlot(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//       setPlot('Error: Unable to fetch plot');
//     }
//   };

//   // Function to handle /cayley_table request
//   const handleCayleyTable = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/cayley_table`, {
//         params: {
//           a: Number(input1),
//           b: Number(input2),
//           p: Number(input3)
//         }
//       });
//       setCayleyTable(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//       setCayleyTable('Error: Unable to fetch Cayley table');
//     }
//   };

//   // Function to handle CSV download for the Cayley table
//   const handleDownloadCSV = () => {
//     const params = new URLSearchParams({
//       a: Number(input1),
//       b: Number(input2),
//       p: Number(input3),
//     });
//     window.location.href = `http://localhost:8000/download_cayley_table?${params.toString()}`;
//   };

//   return (
//     <div>
//       <form onSubmit={handleAdd}>
//         <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)} />
//         <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)} />
//         <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)} />
//         <button type="submit">Get Result</button>
//       </form>

//       {result && <p>Result: {result}</p>}

//       <button onClick={handlePlot}>Generate Plot</button>
//       {plot && (
//         <div>
//           <h3>Generated Plot:</h3>
//           <div dangerouslySetInnerHTML={{ __html: plot }} />
//         </div>
//       )}

//       <button onClick={handleCayleyTable}>Generate Cayley Table</button>
//       {cayleyTable && (
//         <div>
//           <h3>Cayley Table:</h3>
//           <div dangerouslySetInnerHTML={{ __html: cayleyTable }} />
//         </div>
//       )}

//       <button onClick={handleDownloadCSV}>Download Cayley Table as CSV</button> {/* Button for CSV download */}
//     </div>
//   );
// }

// export default App;

