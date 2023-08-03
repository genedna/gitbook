import React, { useState } from 'react';
import styles from './Blob.module.css'

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
    <div className={styles["Blob"]}>
      <form onSubmit={handleSubmit}>
        <label>
          输入文件内容：
          <input type="text" value={input} onChange={handleInput} style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px",
            margin: "8px",
          }} />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>生成</button>
        {rows.length > 0 && (
          <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>重置</button>
        )}
      </form>
      {rows.length > 0 && (
        <div>
        <table style={{ border: "1px solid black", borderCollapse: "collapse", marginBottom: "20px", marginTop: "20px" }}>
          <thead>
          <tr>
            <th colspan="4" style={{ border: "1px solid black", padding: "5px" }}>Type</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Space</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>/0</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Size</th>
            <th colspan={6 + Math.max(...rows.map((row) => row.content.length))} style={{ border: "1px solid black", padding: "5px" }}>Content</th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>b</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>l</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>o</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>b</td>
              <td style={{ border: "1px solid black", padding: "5px" }}> </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>/0</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{(row.content.match(/[\u4e00-\u9fa5]/g) || []).length * 2+(row.content.match(/[a-zA-Z]/g)).length}</td>
              {[...row.content].map((char, index) => (
                <td key={index} style={{ border: "1px solid black", padding: "5px" }}>{char}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
          {rows.map((row) => (
            <div>
            <span>Blob-Size: </span>
            <span>{7 + (row.content.match(/[\u4e00-\u9fa5]/g) || []).length * 2+(row.content.match(/[a-zA-Z]/g)).length}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;