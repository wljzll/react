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