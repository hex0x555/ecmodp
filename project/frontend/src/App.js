import React, { useState } from 'react';
import axios from 'axios';

// All requests go to Nginx at /api (which proxies to Flask :8000)
const api = axios.create({
  baseURL: '/api',
  headers: { 'Cache-Control': 'no-store' },
});

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState(null);
  const [plot, setPlot] = useState(null);
  const [cayleyTable, setCayleyTable] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get('/add', {
        params: { a: +input1, b: +input2, p: +input3, t: Date.now() },
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult('Error: Unable to fetch data');
    }
  };

  const handlePlot = async () => {
    try {
      const { data } = await api.get('/plot', {
        params: { a: +input1, b: +input2, p: +input3, t: Date.now() },
      });
      setPlot(data);
    } catch (err) {
      console.error(err);
      setPlot('Error: Unable to fetch plot');
    }
  };

  const handleCayleyTable = async () => {
    try {
      const { data } = await api.get('/cayley_table', {
        params: { a: +input1, b: +input2, p: +input3, t: Date.now() },
      });
      setCayleyTable(data);
    } catch (err) {
      console.error(err);
      setCayleyTable('Error: Unable to fetch Cayley table');
    }
  };

  const handleDownloadCSV = () => {
    const params = new URLSearchParams({ a: +input1, b: +input2, p: +input3, t: Date.now() });
    window.location.href = `/api/download_cayley_table?${params.toString()}`;
  };

  return (
    <div style={styles.container}>
      {/* swap this for a real asset path if needed */}
      <img src="/gif.gif" alt="Nautical animation" style={styles.gif} />

      <h1 style={styles.header}>ecmodp</h1>

      <form onSubmit={handleAdd} style={styles.form}>
        <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)} style={styles.input} placeholder="Enter a" />
        <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)} style={styles.input} placeholder="Enter b" />
        <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)} style={styles.input} placeholder="Enter p" />
        <button type="submit" style={styles.button}>Calculate points</button>
      </form>

      {result && <p style={styles.result}>Result: {result}</p>}

      <button onClick={handlePlot} style={styles.button}>Generate Plot</button>
      {plot && (
        <div>
          <h3 style={styles.subHeader}>Generated Plot:</h3>
          <div dangerouslySetInnerHTML={{ __html: plot }} />
        </div>
      )}

      <button onClick={handleCayleyTable} style={styles.button}>Generate Cayley Table</button>
      {cayleyTable && (
        <div>
          <h3 style={styles.subHeader}>Cayley Table:</h3>
          <div dangerouslySetInnerHTML={{ __html: cayleyTable }} />
        </div>
      )}

      <button onClick={handleDownloadCSV} style={styles.button}>Download Cayley Table as CSV</button>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '30px', backgroundColor: '#d1d1d1', color: '#333', fontFamily: 'Arial, sans-serif', minHeight: '100vh' },
  gif: { width: '100px', marginBottom: '20px' },
  header: { fontSize: '3rem', fontWeight: '300', color: '#2190ff', fontFamily: '"Century Gothic","Avenir Light",sans-serif', textTransform: 'lowercase', letterSpacing: '10px' },
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', maxWidth: '400px', margin: '0 auto' },
  input: { padding: '6px', borderRadius: '6px', border: '1px solid #333', outline: 'none', width: '100%', maxWidth: '250px', fontSize: '0.9rem' },
  button: { padding: '8px 16px', marginTop: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#e3e3e3', color: '#2190ff', fontSize: '1rem', fontFamily: 'Helvetica, sans-serif', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.3s, background 0.3s' },
  result: { marginTop: '15px', padding: '10px', borderRadius: '8px', backgroundColor: '#e0f2f1', color: '#005f73', fontSize: '1.2rem' },
  subHeader: { color: '#2190ff', fontSize: '1.5rem' },
};

export default App;