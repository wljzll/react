import {
  updateQueue
} from "./Component";

export function addEvent(dom, eventType, handler) {
  // 赋过值就取出来 没赋过值定义一个空对象
  let store = dom.store || (dom.store = {})
  // 保存事件处理函数
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

function dispatchEvent(event) {
  // target: 目标DOM type: 事件类型
  let {target, type} = event;
  // 组合成事件
  let eventType = `on${type}`;
  let syntheticEvent = createSyntheticEvent(event);
  // 开启批量更新
  updateQueue.isBatchingUpdate = true;
  while(target) {
    let { store } = target;
    let handler = store && store[eventType];
    handler && handler(syntheticEvent);
    //在执行handler的过程中有可能会阻止冒泡
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }
  // 事件处理函数执行完成 批量更新组件
  updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {
    let value = nativeEvent[key];
    if (typeof value === 'function') value = value.bind(nativeEvent);
    syntheticEvent[key] = nativeEvent[key]
  }
  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.isDefaultPrevented = false;
  syntheticEvent.isPropagationStopped = false;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent;
}

function preventDefault() {
  this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.preventDefault) {
    event.preventDefault();
  } else { //IE
    event.returnValue = false;
  }
  this.isDefaultPrevented = true;
}

function stopPropagation() {
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else { //IE
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}
