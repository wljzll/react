### React.createElement()方法
```javascript
/**
 * <h1>hello</h1>
 * React.createElement("h1", null, "hello");
 */
```
```javascript
/**
 * <h1 id="title">hello</h1>
 * React.createElement("h1", { id: "title"}, "hello");
 */
 ```

```javascript
/**
 * <h1 id="title">hello<span>world</span></h1>
 * React.createElement("h1", {id: "title"}, "hello", React.createElement("span", null, "world"));
 */
// /*#__PURE__*/ 表示这个一个纯函数 在treeshaking的时候可以大胆处理
```

### 虚拟DOM
```javascript
{
  "type": "h1", // 元素的类型
  "key": null,  // 是用来区分同一个父亲的不同的儿子的
  "ref": null,  // 这个是用来获取真实的DOM元素的
  "props": { // 属性
    "id": "title",
    "children": ["hello", "world"]
  },
  "_owner": null,
  "_store": {}
}
```