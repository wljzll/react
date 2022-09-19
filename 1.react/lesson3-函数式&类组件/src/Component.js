export class Component {
    static isReactComponent = true
    constructor(props) {
        this.props = props;
    }
}

// 原版源码里的写法
Component.prototype.isReactComponent = {};