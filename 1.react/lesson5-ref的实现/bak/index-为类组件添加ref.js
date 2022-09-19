// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

class Form extends React.Component {
  input
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.getFocus();
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
class TextInput extends React.Component {
  input
  constructor(props) {
      super(props);
      this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  }
  render() {
    return <input ref={this.input} />
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
