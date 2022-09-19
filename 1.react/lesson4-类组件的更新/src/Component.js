import { compareTwoVdom, findDom } from "./react-dom/client";

export let updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(), // 存放要更新的类组件
  batchUpdate() {
    updateQueue.isBatchingUpdate = false;
    for (const updater of this.updaters) {
      updater.updateComponent();
    }
  }
}
class Updater {
  /**
   *
   * @param {*} classInstance 类组件的实例
   */
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = []; // 保存将要更新的队列
        this.callbacks = [];
    }
    addState(partialState, callback) {
        // 收集partialState
        this.pendingStates.push(partialState);
        // 如果有callback收集callback
        if (typeof callback === 'function')
            this.callbacks.push(callback);
        // 触发更新
        this.emitUpdate();
    }
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
        // 如果是批量更新
        if (updateQueue.isBatchingUpdate) {
          // 收集要更新的组件实例
          updateQueue.updaters.add(this);
        } else{
          // 否则直接更新
          this.updateComponent();
        }
    }
    updateComponent() {
        let {classInstance, pendingStates} = this;
        // pendingStates有值 用新值更新组件 如果props变化了也触发更新
        if(this.nextProps || pendingStates.length > 0) {
            shouldUpdate(classInstance, this.nextProps,  this.getState());
        }
    }
    getState() {
      let {classInstance, pendingStates} = this;
      // 从类组件上解构出state 这时state就与类组件的state切断了引用
      let { state } = classInstance;
      // 遍历pendingStates 执行每个partialState得到本次的最终结果
      pendingStates.forEach(nextState => {
        if (typeof nextState === 'function') {
           nextState = nextState(state);
        }
        state = {...state, ...nextState};
      })
      pendingStates.length = 0;
      return state;
    }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  if(nextProps) classInstance.props = nextProps;
  // 用最新的state更新类组件的state
  classInstance.state = nextState;
  // 调用类组件的forceUpdate方法更新组件
  classInstance.forceUpdate();
}

export class Component {
    static isReactComponent = true
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }
    // 修改state的方法
    setState(partialState, callback) {
      // 每次调用setState都将partialState、callback收集起来
      this.updater.addState(partialState, callback);
    }
    forceUpdate () {
      // 获取类组件中的jsx的虚拟DOM
      let oldRenderVdom = this.oldRenderVdom;
      // 找到上次渲染出的JSX的真实DOM
      let oldDom = findDom(oldRenderVdom);
      // 重新执行类组件中的render方法 拿到JSX的最新的虚拟DOM
      let newRenderVdom = this.render();
      compareTwoVdom(oldDom.parentNode, oldRenderVdom, newRenderVdom);
      this.oldRenderVdom = newRenderVdom;
    }
}
// 原版源码里的写法
// Component.prototype.isReactComponent = {};
