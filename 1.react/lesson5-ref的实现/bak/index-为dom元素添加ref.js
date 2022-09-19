// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

class Sum extends React.Component {
  a
  b
  result
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
  }
  handleAdd = () => {
    let a = this.a.current.value;
    let b = this.b.current.value;
    this.result.current.value = a + b;
  }
  render() {
    return (
        <>
            <input ref={this.a} />+<input ref={this.b} /><button onClick={this.handleAdd}>=</button><input ref={this.result} />
        </>
    );
}
}

let element = <Sum name="zhufeng666" />;
console.log(element, '类组件本身');

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  element
);

// // 自己实现的
// ReactDOM.render(
//   element, document.getElementById('root')
// );
