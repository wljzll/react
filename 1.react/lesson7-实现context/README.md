Counter 1 constructor
Counter 2 componentWillMount
Counter 3 render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 4 componentDidMount
<!-- first click 1 -->
Counter 5 shouldComponentUpdate
<!-- second click 2 -->
Counter 5 shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3 render
ChildCounter 4.componentWillReceiveProps
ChildCounter 5.shouldComponentUpdate
Counter 7.componentDidUpdate
<!-- third click 3 -->
Counter 5 shouldComponentUpdate
<!-- forth click 4 -->
Counter 5 shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3 render
ChildCounter 6.componentWillUnmount
Counter 7.componentDidUpdate
<!-- fifth click 5 -->
Counter 5 shouldComponentUpdate
<!-- sixth click 6 -->
Counter 5 shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3 render
ChildCounter 1.componentWillMount
ChildCounter 2.render
ChildCounter 3.componentDidMount
Counter 7.componentDidUpdate
<!-- seventh click 7 -->
Counter 5 shouldComponentUpdate

### 自己实现的
Counter 1 constructor
Counter 2 componentWillMount
Counter 3 render
Counter 4 componentDidMount
Counter 5 shouldComponentUpdate
Counter 5 shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3 render
Counter 7.componentDidUpd
