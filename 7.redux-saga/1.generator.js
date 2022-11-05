function* read() { // 表示它是一个generator函数 可以将函数切成若干部分
    console.log('谁先执行')
    const a = yield (function () {
        // console.log('是不是会执行yield后面的语句');
        return 'test'
    });
    console.log(a, 'a=======');
    const b = yield 2;
    console.log(b, 'b=======');
    const c = yield 3;
    console.log(c, 'c=======');
}

console.log(read);
const it = read();
console.log(it) // Object [Generator] {}
console.log('第一次调用next', it.next('next的参数是yield的返回值')); // { value: 1, done: false }
console.log(it.next(123));
console.log(it.next());
console.log(it.next());
/**
 * 1. 执行迭代器(it)的next()方法 每次碰到yield语句就停止执行 是指只执行完yield后
 *    的语句 并不对yield之前的语句进行执行;
 *    it.next()执行返回的{value: 值，done: true/false} 值就是yield语句后面的表达式或者表达式执行的返回值
 *    例如上面的例子: 第一次执行it.next()把yield后的函数执行完毕就停止了 不会对a
 *    进行赋值
 *
 * 2. yield后的语句就是产出{value: 值, done: true/false}的value属性的值
 *
 * 3. 给next()方法传递参数 就是给上一次yield的返回值赋值, 第一次执行next()
 *    给next传递参数没有意义;
 *    例如上面的例子: 第二次执行next()传递的参数就是a的值
 *
 * 4. 如果生成器有返回值 这个返回值就是最后 {value: 值, done: true}的value对应的值
 */
