import React, { useState } from "react";
import styles from './VLC.module.css'

export default function VLC() {
  // 定义状态变量
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [step, setStep] = useState(0);
  const [showLists, setShowLists] = useState(true);

  // 定义步骤数组
  const steps = ['①请输入一个十进制数（范围控制在0~2097151内），并按下“enter“键',
    '②输入被转化为二进制（继续进程请按”下一步“按钮）',
    '③组件将二进制数字遍历，每次读7位；每读取一位数字，都将其从低位开始置于表格框内',
    '④如果下一位还有，最高位补1（否则补0）；如果不足7位则补0补满7位',
    '⑤将得到的字节序列进行组合',
    '⑥转化为16进制，得到结果',];

  // 处理十进制数输入框的值变化
  const handleInputChange = (event) => {
    setDecimal(event.target.value);
  };

  // 处理按键事件
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      //验证是不是符合要求的数据
      const decimalValue = parseInt(decimal, 10);
      if (isNaN(decimalValue) || decimalValue < 0 || decimalValue > 2097151) {
        alert('请输入0~2097151之间的数字！');
        return;
      }
      // 将输入的十进制数转换为二进制数
      const binaryValue = (decimal >>> 0).toString(2);
      setBinary(binaryValue);
      setStep(1);
      // setShowLists(true);
    }
  };

  // 处理下一步按钮点击事件
  const handleNextStep = () => {
    if(step===2){
      setStep(step+1);
      // // 获取单元格
      // let cells1 = document.querySelector(`.${styles['table-0']}`).getElementsByTagName('td');
      // let cells2 = document.querySelector(`.${styles['table-1']}`).getElementsByTagName('td');
      // let cells3 = document.querySelector(`.${styles['table-2']}`).getElementsByTagName('td');
      //
      // // 定时添加类名
      // let cellIndex1 = 0;
      // let intervalId1 = setTimeout(() => {
      //   cells1[cellIndex1].style.opacity='1';
      //   cellIndex1++;
      //   if (cellIndex1 >= cells1.length) {
      //     clearInterval(intervalId1);
      //     document.querySelector(`.${styles['table-1']}`).style.display = 'table';
      //     let cellIndex2 = 0;
      //     let intervalId2 = setTimeout(() => {
      //       cells2[cellIndex2].style.opacity='1';
      //       cellIndex2++;
      //       if (cellIndex2 >= cells2.length) {
      //         clearInterval(intervalId2);
      //         document.querySelector(`.${styles['table-2']}`).style.display = 'table';
      //         let cellIndex3 = 0;
      //         let intervalId3 = setTimeout(() => {
      //           cells3[cellIndex3].style.opacity='1';
      //           cellIndex3++;
      //           if (cellIndex3 >= cells3.length) {
      //             clearInterval(intervalId3);
      //           }
      //         }, 2000);
      //       }
      //     }, 2000);
      //   }
      // }, 2000);
    }
    else if (step === 3) {

      // 平滑移动表格元素
      const table1 = document.querySelector(`.${styles['table-0']}`);
      console.log("表格1")
      console.log(table1)
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
      }, 2000);
    } else if (step < steps.length - 1 && showLists && step === 1 || step === 4) {
        setStep(step + 1);
    }
  };

  // 处理上一步按钮点击事件
  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else if (step === 0) { // 如果当前是第一步，返回到初始状态
      setBinary('');
      setStep(-1);
      // setShowLists(false);
    }
  };

  // 处理重置按钮点击事件
  const handleReset = () => {
    // setShowLists(false);
    setDecimal('');
    setBinary('');
    setStep(0);
  };

  // 将二进制数转换为数组，并从右往左读取每7个数字
  const binaryToArrays = (binaryValue) => {
    const result = []; // 二维数组
    while (binaryValue) {
      let bits = binaryValue.slice(-7).padStart(7, '0').split('').reverse(); // 取出二进制字符串的最后 7 个字符，不足 7 个字符用 0 补齐，然后将它们倒序排列
      let hasMoreBits = binaryValue.length > 7; // 是否还有剩余的二进制位
      result.push([hasMoreBits ? '1' : '0', ...bits.reverse()]); // 将长度为 8 的数组添加到二维数组中，第一个元素表示是否还有剩余的二进制位
      console.log(result);
      binaryValue = binaryValue.slice(0, -7); // 删掉二进制字符串的最后 7 个字符
    }
    console.log(result);
    return result; //返回
  };


  // 将二进制数转换为数组，并从右往左读取每7个数字
  const binaryArrays = binaryToArrays(binary);

  //二进制转化为十六进制
  const binaryToHexArrays = (binaryArrays) => {
    console.log(binaryArrays);
    const result = [];
    for (let i = 0; i < binaryArrays.length; i++) {
      let bits = binaryArrays[i];
      console.log(bits);
      let hexValue = parseInt(bits.join(''), 2).toString(16).toUpperCase();
      result.push(['0x' + hexValue.padStart(2, '0')]);
    }
    return result;
  }

  const hexArrays = binaryToHexArrays(binaryArrays);
  console.log(hexArrays);

  // 渲染组件
  return (
    <div className={styles["VLC"]}>
      {/* 十进制数输入框和二进制数展示区 */}
      <div style={{ display: "flex", justifyContent: "space-between",}}>
        <div>
          <label htmlFor='decimal-input'/>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* 十进制数输入框 */}
            <input
              type="text"
              id="decimal-input"
              value={decimal}
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
            {/* ➡️符号 */}
            <div style={{ margin: "0 8px" }}>➡️</div>
            {/* 二进制数 */}
            <span>{binary}</span>
          </div>
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
          }}>
          {steps[step]}
        </div>
      )}
      {/* 显示二进制数的数组 */}
      {showLists && step === 2 && (
        <div>
          {binaryArrays.map((chunk, i) => (
            <div key={i} className={`${styles['table-wrapper']} ${styles[`table-${i}`]}`}>
              <table>
                <tbody>
                <tr>
                  {chunk.map((x, j) => (
                    <td key={j}>{x}</td>
                  ))}
                </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}

          <span>这里的依次显示有问题</span>
        </div>
      )}
      {/* 显示二进制数的数组 */}
      {showLists && step === 3 && (
        <div>
          {binaryArrays.map((chunk, i) => (
            <div key={i} className={`${styles['table-wrapper']} ${styles[`table-${i}`]}`}>
              <table>
                <tbody>
                <tr>
                  {chunk.map((x, j) => (
                    <td key={j}>{x}</td>
                  ))}
                </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}
        </div>
      )}
      {/* 显示步骤 */}
      {showLists && step === 4 && (
        <div>
          {binaryArrays.map((chunk, i) => (
            <div key={i} className={`${styles['table-container']} ${styles[`table1-${i}`]}`}>
              <table>
                <tbody>
                <tr>
                  {chunk.map((x, j) => (
                    <td key={j}>{x}</td>
                  ))}
                </tr>
                </tbody>
              </table>
              <br />
            </div>
          ))}
        </div>
      )}
      {/* 显示步骤 */}
      {showLists && step === 5 && (
        <div>
          <div>
            {binaryArrays.map((chunk, i) => (
              <div key={i} className={`${styles['table-container']} ${styles[`table1-${i}`]}`}>
                <table>
                  <tbody>
                  <tr>
                    {chunk.map((x, j) => (
                      <td key={j}>{x}</td>
                    ))}
                  </tr>
                  </tbody>
                </table>
                <br />
              </div>
            ))}
          </div>
          <div className={styles["hex"]}>
            <div className={styles["down-arrow"]}>↓</div>
            {hexArrays.join(' ')}
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