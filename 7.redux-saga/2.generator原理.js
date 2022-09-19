// function* read() {
//     const a = yield 1;
//     console.log(a, 'a=======');
//     const b = yield 2;
//     console.log(b, 'b=======');
//     const c = yield 3;
//     console.log(c, 'c=======');
// }

// const it = read();
// console.log(it);
// console.log(it.next());
// console.log(it.next(123));
// console.log(it.next());
// console.log(it.next());
/**
 * 1. 执行迭代器(it)的next()方法 每次碰到yield语句就停止执行 是指只执行完yield后
 *    的语句 并不对yield之前的语句进行执行;
 *    例如上面的例子: 第一次执行it.next()把yield后的函数执行完毕就停止了 不会对a
 *    进行赋值
 * 
 * 2. yield后的语句就是产出{value: 值, done: true/false}的value属性的值
 * 
 * 3. 给next()方法传递参数 就是给上一次yield的返回值赋值, 第一次执行next()
 *    给next传递参数没有意义;
 *    例如上面的例子: 第二次执行next()传递的参数就是a的值
 */

var _marked = regeneratorRuntime().mark(read);

let regeneratorRuntime = {
    mark(genFn) { // 没啥用
        return genFn
    },
    warp(iteratorFn) {
        const context = {
            next: 0,
            done: false, // 表示迭代器没有执行完毕
            stop() {
                context.done = true; // 表示整个函数执行完毕
            },
            sent: null
        }

        let it = {};
        it.next = function (value) { // 此value会传递给上一次yield的返回值
            // 把next传递的参数保存下来
            context.sent = value;
            let val = iteratorFn(context);
            return {
                val: value,
                done: context.done,
            }
        }
        return it;
    }
}


function read() {
    var a, b, c;
    return regeneratorRuntime().wrap(function read$(_context) {
        while (1) { // 这个while 1 表示这个方法不止执行一次 方法会多次执行
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    a = _context.sent;
                    console.log(a, 'a=======');
                    _context.next = 6;
                    return 2;

                case 6:
                    b = _context.sent;
                    console.log(b, 'b=======');
                    _context.next = 10;
                    return 3;

                case 10:
                    c = _context.sent;
                    console.log(c, 'c=======');

                case 12:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked);
}

let it = read();
it.next('无意义的参数');