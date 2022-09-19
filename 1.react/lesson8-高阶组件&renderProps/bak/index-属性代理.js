import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

const loading = message => {
  return OldComponent => {
    return class extends React.Component {
      render() {
        const state = {
          show: () => {
            console.log('show', message);
          },
          hide: () => {
            console.log('hide', message);
          }
        }
        return ( <OldComponent { ...this.props} {...state} {...{...this.props, ...state}} message={message}/>)
      }
    }
  }
}
// @loading('消息')
class Hello extends React.Component{
  render(){
    console.log(this.props, '=========')
    return <div>{this.props.message}<button onClick={this.props.show}>show</button><button onClick={this.props.hide}>hide</button></div>;
  }
}
let LoadingHello  = loading('消息')(Hello);

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Hello/>
// );

let element = <Hello name='zs' />;
console.log(element);
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
