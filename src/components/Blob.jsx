import React, { useState } from 'react';

function Table(props) {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState([]);

  const handleInput = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(rows.length==0){
      const newRow = {
        id: rows.length + 1,
        content: input
      };
      setRows([...rows, newRow]);
      setInput('');
    };
  }

  const handleReset = () => {
    setRows([]);
    setInput('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input type="text" value={input} onChange={handleInput} style={{ marginLeft: "10px" }} />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>Generate</button>
        {rows.length > 0 && (
          <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
        )}
      </form>
      {rows.length > 0 && (
        <table style={{ border: "1px solid black", borderCollapse: "collapse", marginBottom: "20px", marginTop: "20px" }}>
          <thead style={{ display: rows.length > 0 ? 'table-header-group' : 'none' }}>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Type</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Space</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Size</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Content</th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>blob</td>
              <td style={{ border: "1px solid black", padding: "5px" }}></td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{row.content.length}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{row.content}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
      {rows.length > 0 && (
        <table style={{ border: "1px solid black", borderCollapse: "collapse", marginBottom: "20px", marginTop: "20px" }}>
          <thead>
          <tr>
            <th colspan="4" style={{ border: "1px solid black", padding: "5px" }}>Type</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Space</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Size</th>
            <th colspan={7 + Math.max(...rows.map((row) => row.content.length))} style={{ border: "1px solid black", padding: "5px" }}>Content</th>
            {/* {[...rows.reduce((acc, row) => {
                row.content.split("").forEach((_, index) => {
                  if (!acc.includes(index + 7)) {
                    acc.push(index + 7);
                  }
                });
                return acc;
              }, [])].map((columnIndex) => (
                <th key={columnIndex} style={{ border: "1px solid black", padding: "5px" }}>Column {columnIndex}</th>
              ))} */}
          </tr>
          </thead>
          <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>b</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>l</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>o</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>b</td>
              <td style={{ border: "1px solid black", padding: "5px" }}></td>
              <td style={{ border: "1px solid黑", padding: "5px" }}>{row.content.length}</td>
              {[...row.content].map((char, index) => (
                <td key={index} style={{ border: "1px solid black", padding: "5px" }}>{char}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      )}
      {rows.length > 0 && (
        <table style={{ border: "1px solid black", borderCollapse: "collapse", marginBottom: "20px", marginTop: "20px" }}>
          <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid black", padding: "5px",width:"40px",backgroundColor:"#ffaaa5" }}>blob</td>
              <td style={{ border: "1px solid black", padding: "5px" ,width:"40px",backgroundColor:"#ffd3b6"}}></td>
              <td style={{ border: "1px solid black", padding: "5px" ,width:"40px",backgroundColor:"#dcedc1"}}>{row.content.length}</td>
              <td style={{ border: "1px solid black", padding: "5px" ,width:"40px",backgroundColor:"#a8e6cf"}}>{row.content}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;