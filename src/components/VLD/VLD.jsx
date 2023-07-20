import React, { useState } from "react";
import styles from './VLD.module.css'

export default function VLD() {
  // 定义状态变量
  const [binary, setBinary] = useState('');
  const [binaryArray, setBinaryArray] = useState([]);
  const [step, setStep] = useState(-1);
  const [showLists, setShowLists] = useState(false);
  const [mergedArray, setMergedArray] = useState([]);

  // 定义步骤数组
  const steps = ['啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    '哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇',
    '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
    '呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀'];

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
      setStep(0);
      setShowLists(true);
    }
  };

  // 处理下一步按钮点击事件
  const handleNextStep = () => {
    if (step === 1) {
      // 平滑移动表格元素
      const table1 = document.querySelector(`.${styles['table-0']}`);
      const table2 = document.querySelector(`.${styles['table-1']}`);
      const table3 = document.querySelector(`.${styles['table-2']}`);
      if (table1) {
        table1.style.transform = 'translateY(28%) translateX(-5%) scale(0.9)';
        // table1.style.setProperty('transform', 'translateX(20%)');
      }
      if (table2) {
        table2.style.transform = 'translateY(-28%) translateX(85%) scale(0.9)';
      }
      if (table3) {
        table3.style.transform = 'translateY(-84%) translateX(175%) scale(0.9)';
      }
      setTimeout(() => {
        // table1.style.setProperty('transform', 'translateY(28%) translateX(-5%) scale(0.9)');
        setStep(step + 1);
      }, 4000);
    }
    else if (step < steps.length - 1 && showLists) {
      setStep(step + 1);
      if (step === 2) {
        // 在第三步调用 mergeArray() 函数并将结果输出到控制台
        const table = removeFirstColumn(groupBinary());
        const merged = mergeArray(table);
        setMergedArray(merged);
        console.log(merged);
      }
    }
  };

  // 处理上一步按钮点击事件
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (step === 0) { // 如果当前是第一步，返回到初始状态
      setBinary('');
      setBinaryArray([]);
      setStep(-1);
      setShowLists(false);
      setMergedArray([]);
    }
  };

  // 处理重置按钮点击事件
  const handleReset = () => {
    setShowLists(false);
    setBinary('');
    setBinaryArray([]);
    setStep(-1);
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
    console.log(table);
    const newTable = table.map((row) => row.slice(1));
    console.log(newTable);
    return newTable;
  };

// 合并数组
  const mergeArray = (table) => {
    const mergedArray = table.flat();
    return mergedArray;
  };

  // 渲染组件
  return (
    <div className={styles["VLD"]}>
      {/* 二进制数输入框和二进制数展示区 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ marginRight: "16px" ,marginTop:"20px"}}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* 二进制数输入框 */}
            <input type="text" id="binary-input" value={binary} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="input" autoComplete="off" />
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
      {showLists && step === 0 && (
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
      {/* 显示步骤 */}
      {showLists && step === 1 && (
        <div className={styles["tb"]}>
          {groupBinary().map((group, groupIndex) => (
            <div key={groupIndex} className={`${styles[`table-${groupIndex}`]}`}>
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
      {/* 显示步骤 */}
      {showLists && step === 2}
      {showLists && step === 3 && (
        <div style={{ marginTop: "16px" }}>
          {removeFirstColumn(groupBinary()).reverse() .map((group, groupIndex) => (
            <table key={groupIndex} style={{
              margin: 0, // 设置外边距为 0
              padding: 0, // 设置内边距为 0
              borderSpacing: 0, // 设置表格元素的边距为 0，
              borderCollapse: "collapse",
              display: "inline-block"
            }}>
              <tbody>
              <tr>
                {group.map((bit, index) => (
                  <td key={index} style={{ border: "1px solid black", padding: "4px" ,width:"25px",height:"25px"}}>
                    {bit}
                  </td>
                ))}
              </tr>
              </tbody>
            </table>
          ))}
          <div>
            <div style={{ margin: "0 8px" }}>↓</div>
            <span style={{fontWeight:"bold"}}>Size=</span>
            {mergedArray.map((bit, index) => (
              <span key={index}>{bit}</span>))}
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