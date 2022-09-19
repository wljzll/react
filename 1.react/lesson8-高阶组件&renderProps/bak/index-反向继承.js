import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

class Button extends React.Component{
  state = {name:'张三'}
  componentWillMount(){
      console.log('Button componentWillMount');
  }
  componentDidMount(){
      console.log('Button componentDidMount');
  }
  render(){
      console.log('Button render');
      return <button name1={this.state.name} title1={this.props.title}/>
  }
}

// 反向继承其实就是可以调用父类的render方法生成虚拟DOM 我们可以在子类的render方法中修改虚拟DOM达到修改父组件的目的
// 基于反向继承：拦截生命周期、state、渲染过程
const wrapper = OldComponent =>{
  // 继承Button组件
  return class NewComponent extends OldComponent {
    state = {
      number: 0
    }
    componentWillMount() {
      console.log('WrapperButton componentWillMount');
      super.componentWillMount();
    }
    componentDidMount() {
      console.log('WrapperButton componentDidMount');
      super.componentDidMount();
    }
    handleClick = () => {
      this.setState({
        number: this.state.number + 1
      });
    }
    render() {
      console.log('WrapperButton render');
      let renderElement = super.render();
      let newProps = {
        ...renderElement.props,
        ...this.state,
        onClick: this.handleClick
      }
      return React.cloneElement(
        renderElement,
        newProps,
        this.state.number
      );
    }
  }
}
let WrappedButton = wrapper(Button);

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <WrappedButton/>
// );

let element = <WrappedButton/>;
console.log(element);
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
