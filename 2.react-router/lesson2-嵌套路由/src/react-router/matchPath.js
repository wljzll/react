import pathToRegexp from 'path-to-regexp';

/**
 * 作用：从Route的path属性中提取出对应的正则表达式包括参数等
 * @param {*} path Route上的path属性
 * @param {*} options 收集起来的其他有关正则匹配的属性
 * @returns 
 */
function compilePath(path, options) {
    const keys = [];
    const regexp = pathToRegexp(path, keys, options);
    return { keys, regexp };
}

/**
 * 
 * @param {*} pathname 浏览器地址栏中的真实路径 
 * @param {*} options 匹配的参数 path exact strict sensitive
 */
function matchPath(pathname, options = {}) {
    // 从传入的选项中解构出可能存在的参数 并且指定默认值 path:传入的Route上的path属性值
    let { path = '/', exact = false, strict = false, sensitive = false } = options;
    // keys: 路由后的参数
    let { keys, regexp } = compilePath(path, {
        end: exact,
        strict,
        sensitive
    }) // // /post/:id  keys=["id"] regexp= /\/post\/([^\/]+?)/

    // 用Route的path转换的正则捕获浏览器地址栏中的路径 
    const match = regexp.exec(pathname);
    // 没有捕获到 说明路径不匹配 不渲染这个Route
    if (!match) return null;
    // 捕获到了
    const [url, ...values] = match; //['/post/1','1'] url=/post/1 values=['1']
    // 地址栏中的路径可能多参数
    const isExact = pathname === url;// pathname /post/1/name !== /post/1
    // 如果是精确匹配 多路径的话不行
    if (exact && !isExact) return null;
    // 最后返回结果
    return {
        path, // Route上的原始path
        url, // 正则匹配到的浏览器的pathname的部分
        isExact,
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {})
    }
}

export default matchPath;

/**
   语法：arr.reduce(callback,[initialValue])
   callback:函数中包含四个参数
   - previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
   - currentValue （数组中当前被处理的元素）
   - index （当前元素在数组中的索引)
   - array （调用的数组）
   initialValue （作为第一次调用 callback 的第一个参数。）
 */

