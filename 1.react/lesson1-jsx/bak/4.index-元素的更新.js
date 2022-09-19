// import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 元素的更新
 * React元素本身是不可变的
 * 如果想更新某个元素 可以重新声明渲染，这个就相当于重新创建了
 * React更新只会更新必要的内容(只会更新变化的部分)
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <p>时间：</p>{new Date().getTime()}
    </div>
  )
  root.render(
    element
  );
}
setInterval(tick, 1000);

