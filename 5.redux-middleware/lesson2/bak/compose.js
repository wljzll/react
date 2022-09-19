function add1(str) {
    return '1' + str;
}

function add2(str) {
    return '2' + str;
}

function add3(str) {
    return '3' + str;
}

// console.log(add3(add2(add1('zhufeng'))));

/**
 * 
 * @param  {...any} funcs [add3, add2, add1]
 * @returns 
 */
function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
let fn = compose(add3, add2, add1);
let result = fn('zhufeng');
console.log(result);

/**
 * 第一次执行：a = add3 b = add2 返回： (...args) => add3(add2(...args))
 * 第二次执行：a = [(...args) => add3(add2(...args)] b = add1 返回：
 * (...args) => add3(add2(add1(...args))
 */