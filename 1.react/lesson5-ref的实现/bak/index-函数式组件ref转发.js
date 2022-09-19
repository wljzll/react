// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

const TextInput = React.forwardRef((props, ref) => {
  return <input ref={ref} />
})
console.log(TextInput);
class Form extends React.Component {
  input
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  }
  render () {
    return(
      <>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    );
  }
}

// let element = <Form name="zhufeng666" />;
// console.log(element, '类组件本身');

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Form/>
);

// // 自己实现的
// ReactDOM.render(
//   element, document.getElementById('root')
// );
