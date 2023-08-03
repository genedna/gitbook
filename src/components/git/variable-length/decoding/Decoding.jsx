import React, { useState } from "react";
import styles from './Decoding.module.css'

export default function Decoding() {
  // 定义状态变量
  const [binary, setBinary] = useState('');
  const [binaryArray, setBinaryArray] = useState([]);
  const [step, setStep] = useState(0);
  const [showLists, setShowLists] = useState(true);
  const [mergedArray, setMergedArray] = useState([]);

  // 定义步骤数组
  const steps = ['①请输入一个可变长编码值（例如：1000001000000001），并按下“enter“键',
    '②将输入按位放入表格内以便观察（继续进程请按”下一步“按钮）',
    '③输入按8位一组分割成多个组',
    '④根据第一个字节的最高位来确定该变长整数的长度，如果最高位为0，则该字节就是该变长整数的值，否则需要继续读取后面的字节，直到读取到的字节的最高位为0。',
    '⑤将所有读取的字节组合起来，就得到了该变长整数的值',
    '⑥得到最终结果的大小',];

  // 处理二进制数输入框的值变化
  const handleInputChange = (event) => {
    setBinary(event.target.value);
  };

  // 处理按键事件
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 将输入的二进制数拆分为单独的位
      const binaryArrayValue = binary.split('');
      setBinaryArray(binaryArrayValue);
      setStep(1);
      // setShowLists(true);
    }
  };

  // 处理下一步按钮点击事件
  const handleNextStep = () => {
    if(step < steps.length - 1 && showLists){
      if(step===2){
        const table1 = document.querySelector(`.${styles['table2-0']}`);
        const table2 = document.querySelector(`.${styles['table2-1']}`);
        const table3 = document.querySelector(`.${styles['table2-2']}`);
        //删除第一列
        const rows = table1.querySelectorAll('tr');
        rows.forEach((row) => {
          row.removeChild(row.firstChild);
          const cells = row.querySelectorAll('td');
          cells[0].style.backgroundColor = 'transparent'; // 设置第一个单元格的背景颜色为透明
        });
        // table1.style.transform = 'translateY(71%) translateX(89%) scale(0.9)';
        if(table2){
          //删除第一列
          const rows = table2.querySelectorAll('tr');
          rows.forEach((row) => {
            row.removeChild(row.firstChild);
            const cells = row.querySelectorAll('td');
            cells[0].style.backgroundColor = 'transparent'; // 设置第一个单元格的背景颜色为透明
          });
          // table2.style.right='502px'
        }
        setTimeout(() => {
          setStep(step + 1);
        }, 1000);
      }

      else if (step===3) {
        const table1 = document.querySelector(`.${styles['tb-0']}`);
        const table2 = document.querySelector(`.${styles['tb-1']}`);
        const table3 = document.querySelector(`.${styles['tb-2']}`);
        // //删除第一列
        // const rows = table1.querySelectorAll('tr');
        // rows.forEach((row) => {
        //   row.removeChild(row.firstChild);
        //   const cells = row.querySelectorAll('td');
        //   cells[0].style.backgroundColor = 'transparent'; // 设置第一个单元格的背景颜色为透明
        // });
        table1.style.transform = 'translateY(71%) translateX(90%) scale(0.9)';

        setTimeout(() => {
          if(table2){
            // //删除第一列
            // const rows = table2.querySelectorAll('tr');
            // rows.forEach((row) => {
            //   row.removeChild(row.firstChild);
            //   const cells = row.querySelectorAll('td');
            //   cells[0].style.backgroundColor = 'transparent'; // 设置第一个单元格的背景颜色为透明
            // });
            table2.style.right='502px'
          }
          setStep(step + 1);
        }, 3000);
        //setStep(step + 1);
      }
      // if (step===3 && table2) {
      //   table2.style.transform = 'translateY(-28%) translateX(85%) scale(0.9)';
      // }
      else {
        setStep(step + 1);
      }
      // if (table3) {
      //   table3.style.transform = 'translateY(-84%) translateX(175%) scale(0.9)';
      // }
    }
    // else if (step < steps.length - 1 && showLists) {
    //   setStep(step + 1);
    //   if (step === 3) {
    //     // 在第三步调用 mergeArray() 函数并将结果输出到控制台
    //     const table = removeFirstColumn(groupBinary());
    //     const merged = mergeArray(table);
    //     setMergedArray(merged);
    //     console.log(merged);
    //   }
    // }
  };

  // 处理上一步按钮点击事件
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (step === 0) { // 如果当前是第一步，返回到初始状态
      setBinary('');
      setBinaryArray([]);
      setStep(0);
      // setShowLists(false);
      setMergedArray([]);
    }
  };

  // 处理重置按钮点击事件
  const handleReset = () => {
    // setShowLists(false);
    setBinary('');
    setBinaryArray([]);
    setStep(0);
    setMergedArray([]);
  };

  // 将二进制数按八位一组分组
  const groupBinary = () => {
    const binaryArrayCopy = [...binaryArray];
    const groups = [];
    while (binaryArrayCopy.length > 0) {
      groups.push(binaryArrayCopy.splice(0, 8));
    }
    console.log(1);
    console.log(groups);
    return groups;
  };

// 去掉表格的第一列
  const removeFirstColumn = (table) => {
    const newTable = table.map((row) => row.slice(1));
    return newTable;
  };


  // 渲染组件
  return (
    <div className={styles["Decoding"]}>
      {/* 二进制数输入框和二进制数展示区 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>
            {/* 二进制数输入框 */}
            <input
              type="text"
              id="binary-input"
              value={binary}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="input"
              autoComplete="off"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px",
                margin: "8px",
              }}
            />
          </div>
        </div>
        {/* 显示步骤 */}
        {showLists && (
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              border: "1px solid green",
              borderRadius: "4px",
              padding: "8px",
              width: "250px",
              margin:"10px"
            }}
          >
            {steps[step]}
          </div>
        )}
      </div>
      {/* 显示二进制数的数组 */}
      {/* 第一步 */}
      {showLists && step === 1 && (
        <div className={styles["table-wrapper"]}>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
            <tr>
              {binaryArray.map((bit, index) => (
                <td key={index}>
                  {bit}
                </td>
              ))}
            </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* 第二步 */}
      {showLists && step === 2 && (
        <div>
          {groupBinary().map((group, groupIndex) => (
            <div key={groupIndex} className={`${styles['table-containers']} ${styles[`table2-${groupIndex}`]}`}>
              <table>
                <tbody>
                <tr>
                  {group.map((bit, index) => (
                    <td key={index}>
                      {bit}
                    </td>
                  ))}
                </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {/* 第三步 */}
      {/*移动结果*/}
      {showLists && step === 3 && (
        <div>
          {removeFirstColumn(groupBinary()).map((group, groupIndex) => (
            <div key={groupIndex} className={`${styles['table-containers3']} ${styles[`tb-${groupIndex}`]}`}>
              <table>
                <tbody>
                <tr>
                  {group.map((bit, index) => (
                    <td key={index}>
                      {bit}
                    </td>
                  ))}
                </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {/* 第四步 */}
      {/*移动到中央*/}
      {showLists && step === 4&& (
        <div>
          {removeFirstColumn(groupBinary()).reverse() .map((group, groupIndex) => (
            <div key={groupIndex} className={`${styles['table-container']} ${styles[`table3-${groupIndex}`]}`}>
              <table>
                <tbody>
                <tr>
                  {group.map((bit, index) => (
                    <td key={index}>
                      {bit}
                    </td>
                  ))}
                </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {/*第五步*/}
      {showLists && step === 5 && (
        <div  className={styles["result"]}>
          {removeFirstColumn(groupBinary()).reverse() .map((group, groupIndex) => (
            <div key={groupIndex} className={`${styles['table-con']} ${styles[`table4-${groupIndex}`]}`}>
              <table>
                <tbody>
                <tr>
                  {group.map((bit, index) => (
                    <td key={index}>
                      {bit}
                    </td>
                  ))}
                </tr>
                </tbody>
              </table>
            </div>
          ))}
          <div style={{marginTop:"100px",}}>
            <div style={{marginLeft:"50%"}}>↓</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{fontWeight:"bold"}}>Size=</span>
              {removeFirstColumn(groupBinary()).reverse() .map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.map((bit, index) => (
                    <span key={index}>
                      {bit}
                    </span>
                  ))}
                </div>))}
            </div>
          </div>
        </div>
      )}
      {/* 操作按钮 */}
      <div className={styles["button-container"]}>
        <button onClick={handlePrevStep} disabled={step <= 0}>上一步</button>
        <button onClick={handleNextStep} disabled={step >= steps.length - 1}>下一步</button>
        <button onClick={handleReset}>重置</button>
      </div>
    </div>
  );
}