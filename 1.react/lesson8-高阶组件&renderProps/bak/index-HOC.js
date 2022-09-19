import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// HOC(Higher-order component)是一种React 的进阶使用方法，主要还是为了便于组件的复用。强调一点，HOC本身并不是 React API,
// 它就是一个方法，一个接收一个组件作为参数，返回一个增强的组件的方法。个人认为其实是一种开发思想，并没有固定的要求

function withTracker(OldComponent){
  return class MouseTracker extends React.Component{
    constructor(props){
        super(props);
        this.state = {x:0,y:0};
    }
    handleMouseMove = (event)=>{
        this.setState({
            x:event.clientX,
            y:event.clientY
        });
    }
    render(){
        return (
            <div onMouseMove = {this.handleMouseMove}>
               <OldComponent {...this.state}/>
            </div>
        )
    }
 }
}
//render
function Show(props){
    return (
        <React.Fragment>
          <h1>请移动鼠标</h1>
          <p>当前鼠标的位置是: x:{props.x} y:{props.y}</p>
        </React.Fragment>
    )
}
let HighShow = withTracker(Show);
// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Hello/>
// );

let element = <HighShow />;
console.log(element);
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
