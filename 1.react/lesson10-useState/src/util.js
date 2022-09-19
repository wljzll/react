import { REACT_TEXT } from "./constant";
/**
 *
 * @param {*} element babel编译后的子元素
 * @returns
 */
export function wrapToVdom(element) {
    // 如果这个元素不是React.createElement()函数 说明是文本或数字将其包装成虚拟DOM形式
    if (typeof element === 'string' || typeof element === 'number') {
        return {
            type: REACT_TEXT,
            props: {
                content: element
            }
        }
    } else { // 这种情况说明子元素是React.createElement()函数直接返回就行
        return element;
    }
}

/**
 * @description 浅比较两个object是否相等
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) { // 相等
      return true;
    }

    // 存在不是对象或则和null的情况 不相等
    if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) {
      return false;
    }

    let keys1 = Object.keys(obj1); // 拿到所有的键
    let keys2 = Object.keys(obj2); // 拿到所有的键
    if (keys1.length !== keys2.length) { // 键都不一样直接return
      return false;
    }
    // 键的个数一样了 随便拿一个遍历
    for (let key of keys1) {
      if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) { // 另一个不存在或者不相等 也是不相等
        return false;
      }
    }

    // 走到这里就说明相等
    return true;
  }
