import React, { useState, useEffect } from 'react';

function MovingArrow() {
  const [arrowPosition, setArrowPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const container = document.getElementById('container'); // 获取外层 <div> 元素
    const containerRect = container.getBoundingClientRect(); // 获取外层 <div> 元素的边界信息

    const intervalId = setInterval(() => {
      setArrowPosition(prevPosition => {
        const newLeft = prevPosition.left + 5;
        const newTop = prevPosition.top;

        // 检查箭头是否超出了外层 <div> 元素的边界
        if (newLeft + 20 > containerRect.right) {
          return { left: containerRect.right - 20, top: newTop };
        } else {
          return { left: newLeft, top: newTop };
        }
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="container" style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid black' }}>
      <div style={{ position: 'absolute', left: arrowPosition.left + 'px', top: arrowPosition.top + 'px' }}>↓</div>
    </div>
  );
}

export default MovingArrow;