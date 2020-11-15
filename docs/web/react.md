# React

## 1. React核心概念

- 虚拟DOM(Virtual DOM)
- Diff算法(Diff Algorithm)
- 单向数据流渲染(Data Flow)
- 组件生命周期
- JSX
- 一切皆为组件

## 2. 搭建开发环境

  `mkdir react-demo`

  `cd react-demo`

  `npm init -y`

  `npm install react react-dom -S`

  `npm install webpack webpack-cli webpack-dev-server babel babel-cli babel-core babel-loader@7 babel-preset-react babel-preset-env babel-preset-es2015 -D` （解析jsx和es6语法）

注意：babel 6.x版本必须安装babel-loader@7       babel 7.x 必须安装babel-loader@8

- webpack.config.js

```js
module.exports = {
  entry: './main.js',
  output: {
    path: '/',
    filename: 'index.js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'es2015']
        }
      }
    }]
  }
}
```

- index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <title>React App</title>
  </head>
  
  <body>
      <div id="root"></div>
      <script src="index.js"></script>
  </body>
  
  </html>
  ```

- main.js

  ```js
  // React 是 React 库的入口
  // React组件可以通过扩展 React.Component来定义
  import React, { Component } from 'react';
  // react-dom 包提供了 DOM 特定的方法，可以在你的应用程序的顶层使用，如果你需要的话，也可以作为 React模型 之外的特殊操作DOM的接口。 但大多数组件应该不需要使用这个模块。
  import ReactDom from 'react-dom';
  
  class App extends Component {
      render() {
          return <h1> Hello, world! </h1>
      }
  }
  
  // 渲染一个 React 元素到由 container 提供的 DOM 中，并且返回组件的一个 引用
  ReactDom.render(
      <App />,
      document.getElementById('root')
  )
  ```

- package.json

  ```json
  "start": "webpack-dev-server --inline --hot --open --port 8090 --mode development"
  ```


## 3. create-react-app

[React脚手架](https://github.com/facebook/create-react-app) (Facebook官方出品)

`npm install -g create-react-app` 全局全装脚手架工具

`create-react-app my-testproject`  生成项目模板，其中`my-testproject`是项目名称，随意定义

`cd my-testproject`

`npm start` or `yarn start`

## 4. React版hello world

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 强调组件的创建方式，里面模板jsx创建的方式
class App extends Component {
  render() {
    return (
      <div>
        <span>Hello, World.</span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 5. JSX

### 5.1 什么是JSX/基本使用

JSX 是一种类似 XML 语法的语法扩展，可以被编译成“合法”的 JavaScript 代码。
那么如何用一段“合法”的 JavaScript 代码来描述这段 JSX 呢？那么让我们把一个 DOM 抽象成一个 JavaScript 对象，用对象的属性来描述这个 DOM 的结构，比如标签名、属性、子 DOM 等等。我们尝试用 JavaScript 对象来描述第一个例子中的 JSX。

```jsx
{
    type: 'div',
    props: null,
    children: [
        {
            type: 'span',
            text: 'Hello, World.'
        }
    ]
}
```

### 5.2 JSX 嵌套元素

注意：只能包含**一个**根节点

```js
ReactDOM.render(
    // 模板只能包含一个根节点
  <div>
    <h1>hello</h1>
    <h2>jack</h2>
  </div>,
    document.getElementById('root')
);
```

### 5.3 JSX 表达式

```js
import React from 'react';
import ReactDom from 'react-dom';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: '张',
  lastName: '三'
};

let num = 2

ReactDom.render(
  // 表达式只能放在大括号中，注意和vue一样，同样不支持if else语句
  // 如果里面放对象，会报错：Objects are not valid as a React child
  <div>
    <p>{ 1 + 1}</p>
    <p>{ '李' + '宁' }</p>
    <h1>hello {formatName(user)}</h1>
    <p>{num % 2 === 0 ? '偶数' : '奇数'}</p>
  </div>,
  document.getElementById('root')
)
```

### 5.4 JSX注释

```js
    {
      // 这里是单行注释
    }
    {
      /*
      这里是多行注释
      这里是多行注释
      这里是多行注释
      这里是多行注释
      */
    }
```

### 5.5 JSX属性

因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称

1. html的class属性改为**className**
2. html中label标签的for属性改为**htmlFor**
3. 标签中的自定义属性使用**data-**开头   [查看详情](https://reactjs.org/docs/dom-elements.html)

```js
import React from 'react';
import ReactDom from 'react-dom';

const user = {
  avatar: './avatar.jpg'
}

ReactDom.render(
  <div>
    <h1>hello</h1>
    <h2>jack</h2>
    <img src={user.avatar}></img>
    {
      // class ==> className
      // for ==> htmlFor
      // 自定义属性需要以data-开头，规范
    }
    <p className="myStyle">类名</p>

    <label htmlFor="male">Male</label>
    <input type="radio" name="sex" id="male" />

    <p data-mytest="123">自定义属性</p>
  </div>,
  document.getElementById('root')
)
```

### 5.6 Boolean属性

一些常用的属性例如 `disabled` `checked` 等，我们可以省略值来表示为 `true`。

`<input disabled /> `就等同于 `<input disabled={true} />`

### 5.7 使用ES6 拓展运算符

我们可以直接将一个 JavaScript 对象里的属性作为元素的属性合并，使用 ES6 的 rest 特性。

```jsx
import React, { Component } from 'react';

const props = {
  className: 'app',
  id: 'app',
  'data-root': 'root'
}
class App extends Component {
  render() {
    return (
      <div {...props}>
        hello world
      </div>
    );
  }
}

export default App;
```

渲染的 DOM ：`<div class="app" id="app" data-root="root">hello</div>`

### 5.8 JSX行内样式

```js
import React from 'react';
import ReactDom from 'react-dom';

let myStyle = {
  // React会自动在数值后面加上px
  // 非数值的属性值都要加上引号
  // 连字符的属性改为驼峰命名
  fontSize: 100,
  color: '#FF0000'
}

ReactDom.render(
  <div>
    <h1>hello</h1>
    <h2 style={myStyle}>jack</h2>
  </div>,
  document.getElementById('root')
)
```

### 5.9 React.createElement（）

那么我们第一个例子中的代码，在编译后就会变成这样一段“合法”的 JavaScript 代码。

```js
// React.createElement 方法的作用，就是使用JS创建内存中的虚拟DOM，生成一些普通的对象
// 这个方法接收至少三个参数：
//   第一个参数： 指定要创建的元素标签类型[string]
//   第二个参数： 指定要创建的元素身上的属性[对象/null]
//   第三个参数： 指定当前创建的元素的子元素
class App extends Component {
  render() {
    return (
      React.createElement(
            'div',
            null,
            React.createElement(
                'span',
                null,
                'Hello, World.'
            )
      )
    );
  }
}
```

createElement 这个函数会将入参进行处理，最终返回一个以 JavaScript 对象为基础的结构描述我们最终想要得到的 DOM 对象。最终，通过 ReactDOM.render 方法，将所得到的 JavaScript 对象转换成真正的 DOM。

到此，我们知道了，我们所写的 JSX，其实最终都会被编译成为 JavaScript 对象，正是因为这层的抽象，所以使跨平台成为了可能，对于所有拥有 JavaScript 运行环境的平台，我们都可以执行它。
此外，因为将它抽象成了 JavaScript 对象，所以我们也可以更方便地进行 diff/patch（React中的比对算法，用于比对后更新DOM结构）。而不是当数据产生变化的时候，我们直接去比对处理 DOM，这也很大程度上优化了它的性能。

## 6. 组件的创建

### 6.1 组件-函数创建组件

- **组件名称必须以大写字母开头,用于区分 DOM 元素与组件元素**
- **标签必须闭合（但标签双标签都可以）**
- **jsx必须由一个标签包裹**

```js
import React, { Component } from 'react'

const Hello = () => {
  return <div>hello world</div>
}

export class App extends Component {
  render() {
    return (
      <div>
        <Hello></Hello>
      </div>
    )
  }
}

export default App
```

### 6.2 组件-类创建组件

#### 6.2.1 es6 类的学习

```js
function Father(firstName) {
  this.firstName = firstName
}

Father.prototype.getFirstName = function () {
  console.log(this.firstName);
}

Father.sayHello = function () {
  console.log('我是father');
}

function Son(firstName) {
  this.firstName = firstName;
}

let father = new Father('李');
father.getFirstName();
Father.sayHello();

Son.prototype = father;
let son = new Son('李2');
son.getFirstName();
```

```js
class Father {
  // 构造函数，通过new命令生成对象实例时，自动调用该方法。
  constructor(firstName) {
    this.firstName = firstName
  }

  getFirstName() {
    console.log(this.firstName);
  }
  // static 关键字定义静态方法，不能被实例继承（但可以被类继承），只能通过类来调用
  // 静态方法中的this指向的是类，而不是实例
  static sayHello() {
    console.log('我是father');
  }
}

class Son extends Father {
  constructor(firstName) {
    super(firstName);
    console.log('son');
  }
}

let father = new Father('王');
father.getFirstName();
Father.sayHello();

let son = new Son('王2');
son.getFirstName();
```

#### 6.2.2 React.Component 类

```js
import React, { Component } from 'react'

class Hello extends Component {
  render() {
    return (
      <div>
        hello world
      </div>
    )
  }
}

export class App extends Component {
  render() {
    return (
      <div>
        <Hello></Hello>
      </div>
    )
  }
}

export default App
```

组件类的组成必须有 `render` 方法，并且在 `render` 方法内返回 JSX。

渲染组件内容时，经常会使用到条件渲染。`if/else` `三元运算符` `短路运算符`

### 6.3 组件树

组件和组件可以结合在一起，组件的内部又可以使用其他组件，这样组合嵌套后，就构成了一个所谓的组件树。

我们希望设计组件时能保证组件的专一性即：*一个组件只专注做一件事*

一个复杂的功能如果可以拆分成等多个小功能，那就可以将每个小功能封装成一个组件，然后通过组件的嵌套/组合实现复杂功能。

当然也不是拆分的越细、颗粒度越小越好，能控制在一个可控的范围内即可。

### 6.4 组件中的事件处理

- React 事件使用驼峰命名

- 通过 JSX , 你传递一个函数作为事件处理程序

  ```html
  <button onClick={activateLasers}>
    Activate Lasers
  </button>
  ```

- 绑定this（类方法中没有绑定this）

  1. 在构造函数中绑定（建议），这样的好处是仅绑定一次，不存在无用的重复绑定. ⭐

     ```js
     class Hello extends Component {
       constructor(props) {
         super(props)
         this.sayHello = this.sayHello.bind(this)
       }
       sayHello() {
         console.log('hello world!');
       }
       render() {
         return (
           <div>
             <button onClick={this.sayHello}>问好</button>
           </div>
         )
       }
     }
     ```

  2. 使用箭头函数（属性初始化语法），箭头函数没有 this，所以需要继承定义箭头函数所在的作用域的 this

     ```js
     class Hello extends Component {
     
       sayHello = () => {
         console.log('hello world!');
       }
       render() {
         return (
           <div>
             {/*  // 不推荐 每次调用 onClick 事件时都会生成一个新的函数 */}
             <button onClick={this.sayHello}>问好</button>
           </div>
         )
       }
     }
     ```

  3. bind.`bind` 方法返回一个函数，函数的 this 指向 bind 的第一个参数。缺点是每次调用 onClick 事件时都会生成一个新的函数。

     ```js
       class Hello extends Component {
     
       sayHello() {
         console.log('hello world!');
       }
       render() {
         return (
           <div>
             <button onClick={this.sayHello.bind(this)}>问好</button>
           </div>
         )
       }
     }
     ```

### 6.5 state

作用：用来给组件提供**组件内部**使用的数据
注意：

  - **只有通过class创建的组件才具有状态**
  - **状态是私有的，完全由组件来控制**

```js
import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Hello extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'hello world'
    }
    this.changeMsg = this.changeMsg.bind(this)
  }
  changeMsg() {
    this.setState({
      msg: 'hello itcast'
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.msg}</p>
        <button onClick={this.changeMsg}>点击改变msg</button>
      </div>
    )
  }
}

export default class App extends Component {
  render () {
    return (
      <div>
        <Hello/>
      </div>
    )
  }
}
```

- **唯一可以分配 this.state 的地方是构造函数。**

- **不要直接修改 state(状态)， 类似于这样`this.state.comment = 'Hello'`，用 `setState()` 代替：`this.setState({comment: 'Hello'})`**

- **this.setState()方法更新是异步的，此时需要给它传递第二个参数，即一个回调来在更新之后执行，即this.setState({}, callback)**

  ```js
  import React, {Component} from 'react';
  
  class Hello extends Component {
    constructor(props) {
      super(props)
      this.state = {
        msg: 'hello world'
      }
      this.changeMsg = this.changeMsg.bind(this)
    }
    changeMsg() {
      console.log(this.state);
      this.setState({
        msg: 'hello itcast'
      })
      // this.setState()是异步的，所以这里的console.log打印出来并不是想要的。出现这种情况是因为 react 并不会马上修改 state，而是将这个对象放入队列，且一个生命周期内所有的 setState 方法都会合并操作。因此你并不需要担心写多个 setState 带来性能问题。
      console.log(this.state)
    }
    render() {
      return (
        <div>
          <p>{this.state.msg}</p>
          <button onClick={this.changeMsg}>点击改变msg</button>
        </div>
      )
    }
  }
  
  export default class App extends Component {
    render () {
      return (
        <div>
          <Hello/>
        </div>
      )
    }
  }
  
  ```

- **this.setState(）接收函数作为参数** 

  ```js
  this.setState({
    msg: this.state.msg + '1111'
  })
  this.setState({
    msg: this.state.msg + '1111'
  })
  
  // 解决方式,换成一个函数作为参数
  this.setState((prevState) => {
    console.log(prevState);
    return {
      msg: prevState.msg + '1111'
    }
  })
  
  
  ```

- **组件的 state(状态) 可以向下传递，作为其子组件的 props(属性)，通常称为一个“从上到下”，或者“单向”的数据流**

### 6.6 props

作用：props给组件传递数据，一般用在父子组件之间

#### 基础用法

函数式组件和类组件中属性的传递

```jsx
// 函数式组件
import React, {Component} from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>{props.name}: {props.age}</p>
    </div>
  )
}

const obj = {
  name: 'rose',
  age: 19
}
export default class App extends Component {
  render () {
    return (
      <div>
        <Hello name="jack" age={18}/>
        <Hello {...obj}/>
      </div>
    )
  }
}
```

```jsx
// 类组件
import React, {Component} from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name}: {this.props.age}</p>
      </div>
    )
  }
}

const obj = {
  name: 'rose',
  age: 19
}
export default class App extends Component {
  render () {
    return (
      <div>
        <Hello name="jack" age={18}/>
        <Hello {...obj}/>
      </div>
    )
  }
}

```

#### props.children

`props.children` 是 React 内置的 prop，它代表组件的子组件的集合.

```jsx
class Hello extends Component {
  render() {
    return (
      <div>
        hello {this.props.children}
      </div>
    )
  }
}

// Hello组件innerHTML部分的内容会被传入children
<Hello>world</Hello>
```

#### props不可变

注意：props是只读的，无法给props添加或修改属性。如`this.props.name = 'jack'`是不可行的。当然修改还是需要的，不可以在组件内修改 props，我们可以更改传入的 props，这样组件接受到了新的 props 后就可以主动渲染。

#### 默认属性

给类（或者函数）绑定一个defaultProps属性。例如：

```jsx
Hello.defaultProps = {
    name: 'jack'
}

// 或者

class Hello extends Component {
  static defaultProps = {
    name: 'rose'
  }
  render() {
    return (
      <div>
        hello {this.props.name}
      </div>
    )
  }
}
```

#### [属性校验](http://www.css88.com/react/docs/typechecking-with-proptypes.html)

`npm i prop-types -S`

```js
import PropTypes from 'prop-types'

Hello.propTypes = {
  	optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    optionalAny: PropTypes.any,
    optionalRequired: PropTypes.any.isRequired,
}
```

#### props vs state

**相同**

1. 二者都作为 React 内更新视图的依据，只有它们变化时，React 才会进行相应的更新。
2. 二者都不可以通过直接赋值的方式更新。
3. 二者都可以使用任意类型的值。
4. 二者都可以设置默认值。

**不同**

1. 更新方式不同：state 通过 `setState` 方法更新（只能在组件内部更新），props 则通过更新传入的值实现（组件内不可变）。
2. state 只维护组件内部的状态，props 让外部维护组件的状态。

总结：尽量少用state，尽量多用props，这样既能提高组件的可复用性，又能降低维护成本。

### 6.7 函数式组件和类组件的区别

不同：类允许我们在其中添加本地状态(state)和生命周期钩子

相同：里面props是只读的，无法修改

重点：我们在开发的时候，凡是没有state的组件，就一定要使用函数式组件。为什么呢？因为使用函数的方式创建的组件更易于测试和数据的维护。也就是说，只要我们的组件没有state，我们就要使用函数式组件（也叫无状态组件）

## 7. 案例：评论列表

![评论列表](https://cdn.denhuii.com/img/评论列表.png)

```js
import React, { Component } from 'react'

export default class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      commentList: [
        { user: '张三', content: '哈哈，沙发' },
        { user: '张三2', content: '哈哈，板凳' },
        { user: '张三3', content: '哈哈，凉席' },
        { user: '张三4', content: '哈哈，砖头' },
        { user: '张三5', content: '哈哈，楼下山炮' }
      ]
    }
  }
  createComments = () => {
    return this.state.commentList.map((item, index) => {
      return (
        <div key={index}>
          <h3>评论人：{item.user}</h3>
          <div>评论内容：{item.content}</div>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <h1>评论案例列表</h1>
        <div>
          {this.createComments()}
        </div>
      </div>
    )
  }
}

```

改造版本：

```js
import React, { Component } from 'react'
const Comment = (props) => {
  return (
    <div>
      <h3>评论人：{props.user}</h3>
      <div>评论内容：{props.content}</div>
    </div>
  )
}
const NumberList = (props) => {
  return props.list.map((item, index) => {
    return <Comment {...item} key={index}/>
  })
}
export default class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      commentList: [
        { user: '张三', content: '哈哈，沙发' },
        { user: '张三2', content: '哈哈，板凳' },
        { user: '张三3', content: '哈哈，凉席' },
        { user: '张三4', content: '哈哈，砖头' },
        { user: '张三5', content: '哈哈，楼下山炮' }
      ]
    }
  }
  // createComments = () => {
  //   return this.state.commentList.map((item, index) => <Comment key={index} {...item}></Comment>)
  // }
  render() {
    return (
      <div>
        <h1>评论案例列表</h1>
        <div>
          <NumberList list={this.state.commentList}></NumberList>
        </div>
      </div>
    )
  }
}
```



## 8. Virtual DOM

- DOM

  ![dom tree](https://cdn.denhuii.com/img/dom-tree.png)

- 浏览器渲染流程

  ![浏览器渲染原理](https://cdn.denhuii.com/img/webkitflow.png)

- 什么是Virtual DOM

  在React中，render执行的结果得到的并不是真正的DOM节点，结果仅仅是轻量级的**JavaScript对象**，我们称之为virtual DOM。类似于下面这种：

  ```
  {
      type: 'div',
      props: null,
      children: [
          {
              type: 'span',
              text: 'Hello, World.'
          }
      ]
  }
  ```

  

  虚拟DOM是React的一大亮点，具有batching(批处理)和高效的Diff算法。这让我们可以无需担心性能问题而”毫无顾忌”的随时“刷新”整个页面，由虚拟 DOM来确保只对界面上真正变化的部分进行实际的DOM操作。在实际开发中基本无需关心虚拟DOM是如何运作的，但是理解其运行机制不仅有助于更好的理解React组件的生命周期，而且对于进一步优化 React程序也会有很大帮助

- 虚拟DOM VS 原生DOM

  如果没有 Virtual DOM，简单来说就是直接重置 innerHTML。这样操作，在一个大型列表所有数据都变了的情况下，还算是合理，但是，当只有一行数据发生变化时，它也需要重置整个 innerHTML，这时候显然就造成了大量浪费。

  比较innerHTML 和Virtual DOM 的重绘过程如下：

  innerHTML: render html string + 重新创建所有 DOM 元素

  Virtual DOM: render Virtual DOM + diff + 必要的 DOM 更新

  DOM 完全不属于Javascript (也不在Javascript 引擎中存在).。Javascript 其实是一个非常独立的引擎，DOM其实是浏览器引出的一组让Javascript操作HTML文档的API而已。在即时编译的时代，调用DOM的开销是很大的。而Virtual DOM的执行完全都在Javascript 引擎中，完全不会有这个开销。

  React.js 相对于直接操作原生DOM有很大的性能优势， 很大程度上都要归功于virtual DOM的batching 和diff。batching把所有的DOM操作搜集起来，一次性提交给真实的DOM。diff算法时间复杂度也从标准的的Diff算法的O(n^3)降到了O(n)。

- 关于React 虚拟DOM的误解

  React 从来没有说过 “React 比原生操作 DOM 快”。React给我们的保证是，在不需要手动优化的情况下，它依然可以给我们提供过得去的性能。
  框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作。
  React掩盖了底层的 DOM 操作，可以用更声明式的方式来描述我们目的，从而让代码更容易维护。

## 9. Diff 算法

虚拟dom什么时候会被比对？setState()

同层级比较下面的节点不是不会被复用了吗？

  Diff 算法会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，因此 Virtual DOM 与 diff 是保证 React 性能口碑的幕后推手。

- 传统Diff算法

  传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)，其中 n 是树中节点的总数。O(n^3) 到底有多可怕，这意味着如果要展示1000个节点，就要依次执行上十亿次的比较。这种指数型的性能消耗对于前端渲染场景来说代价太高了！现今的 CPU 每秒钟能执行大约30亿条指令，即便是最高效的实现，也不可能在一秒内计算出差异情况。

- React Diff 算法

  [参考](https://zhuanlan.zhihu.com/p/20346379?refer=purerender)

  - Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计
  - 不同类型的两个元素将产生不同的树(根元素不同结构树一定不同)
  - 开发人员可以在不同渲染之间使用key属性来表示哪些子元素是稳定的

  1. tree diff

  ![tree diff](https://cdn.denhuii.com/img/tree-diff.jpg)

    以上两棵树只会对**同一层**次的节点进行比较

    ![tree diff2](https://cdn.denhuii.com/img/tree-diff2.jpg)

    如果两棵树的根元素类型不同，React会销毁旧树，创建新树

    对于类型相同的React DOM 元素，React会对比两者的属性是否相同，只更新不同的属性

    React diff 的执行情况：delete A -> create A -> create B -> create C  (React 官方建议不要进行 DOM 节点跨层级的操作)

  2. component diff

     React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。

     - 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
     - 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
     - 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

     ![component diff](https://cdn.denhuii.com/img/component-diff.jpg)

     D和G为不同类型的组件,会直接删除组件D，重新创建组件G

  3. element diff

     ![](https://cdn.denhuii.com/img/insert-F.png)

     如果每个节点都没有唯一的标识，React无法识别每一个节点，那么更新过程会很低效，即，将C更新成F，D更新成C，E更新成D，最后再插入一个E节点,如下图所示。可以看到，React会逐个对节点进行更新，转换到目标节点。而最后插入新的节点E，涉及到的DOM操作非常多。

     ![](https://cdn.denhuii.com/img/insert-F-no-diff.png)

     如果给每个节点唯一的标识（key），那么React能够找到正确的位置去插入新的节点

     ![](https://cdn.denhuii.com/img/insert-F-diff.png)

[diff演示](https://supnate.github.io/react-dom-diff/index.html)

## 10. 生命周期

![生命周期](https://cdn.denhuii.com/img/React-Lifecycle.png)

组件的生命周期可分成三个状态:

[**constructor(props)**](https://reactjs.org/docs/react-component.html#constructor) 初始化state和方法，组件挂载前被调用

[**render()**](https://reactjs.org/docs/react-component.html#render)它是一个仅仅用于渲染的纯函数，返回值完全取决于this.state和this.props，不能在函数中任何修改props、state、拉取数据等具有副作用的操作。render函数返回的是JSX的对象

[static getDerivedStateFromProps(nextProps, prevState)](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 组件每次被rerender的时候，包括在组件构建之后(render之前最后执行)，每次获取新的props或state之后。**每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state**。 因为是静态函数，所以无法访问组件实例。它可以根据props发请求获取新的数据重新设置state

[shouldComponentUpdate(nextProps, nextState)](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) 判断组件是否需要被更新，返回bool值，true表示要更新，false表示不更新，使用得当将大大提高React组件的性能，避免不需要的渲染。

[getSnapshotBeforeUpdate(prevProps, prevState)](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)update发生的时候，在render之后，在组件dom渲染之前。可以在update之前获取dom节点的属性。返回一个值，作为componentDidUpdate的第三个参数。

[**componentDidMount()**](https://reactjs.org/docs/react-component.html#componentdidmount) 组件挂载之后立即调用，适合在里面发送网络请求

[**componentDidUpdate(prevProps, prevState, snapshot)**](https://reactjs.org/docs/react-component.html#componentdidupdate)组件更新后被立即调用。里面也能够调用setState()，但是需要注意加上条件以免导致死循环

[**componentWillUnmount()**](https://reactjs.org/docs/react-component.html#componentwillunmount)组件被卸载和销毁前调用

## 11. 组件通讯

### 11.1 父组件向子组件通讯

通讯是单向的，数据必须是由一方传到另一方。在 React 中，父组件可以向子组件通过传 props 的方式，向子组件进行通讯。

```jsx
class ChildOne extends Component{
  render() {
    return <p>{this.props.msg}</p>
  }
}

class Parent extends Component {
  constructor() {
    super()
    this.state = {
      val: 'hello world'
    }
  }

  render() {
    return (
      <div>
        <ChildOne msg={this.state.val}/>
      </div>
    );
  }
}
```

### 11.2 子组件向父组件通讯

而子组件向父组件通讯，同样也需要父组件向子组件传递 props 进行通讯，只是父组件传递的，是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中。

```jsx
class ChildOne extends Component{
  transferMsg = () => {
    this.props.getChildMsg('我报名了传智！')
  }
  render() {
    return <button onClick={this.transferMsg}>点击传值给父组件</button>
  }
}

class Parent extends Component {
  constructor() {
    super()
    this.state = {
      msg: 'hello world'
    }
  }
  
  handleMsg = (msg) => {
    this.setState({
      msg
    })
  }

  render() {
    return (
      <div>
        <div>儿子给我说：{this.state.msg}</div>
        <ChildOne getChildMsg={this.handleMsg} />
      </div>
    );
  }
}
```

### 11.3 非父子组件间通讯

对于没有直接关联关系的两个节点，他们唯一的关联点，就是拥有相同的父组件。参考之前介绍的两种关系的通讯方式，如果我们要ChildOne和ChildTwo进行通讯，我们可以先通过 ChildOne 向 Parent 组件进行通讯，再由 Parent 向 ChildTwo 组件进行通讯。注意：这个方法有一个问题，由于 Parent 的 state 发生变化，会触发 Parent 及从属于 Parent 的子组件的生命周期。

```jsx
class ChildOne extends Component{
  transferMsg = () => {
    this.props.getChildMsg('我报名了传智！')
  }
  render() {
    return <button onClick={this.transferMsg}>点击传值给父组件</button>
  }
}

class ChildTwo extends Component {
  render() {
    return <p>我兄弟说：{this.props.msg}</p>
  }
}

class ChildThree extends Component {
  componentDidUpdate() {
    console.log('child 3 updated');
  }
  render() {
    return <p>child 3，我和兄弟1和兄弟2之间的通信没有任何关系</p>
  }
}

class Parent extends Component {
  constructor() {
    super()
    this.state = {
      msg: 'hello world'
    }
  }
  
  handleMsg = (msg) => {
    this.setState({
      msg
    })
  }

  render() {
    return (
      <div>
        <div>儿子给我说：{this.state.msg}</div>
        <ChildOne getChildMsg={this.handleMsg} />
        <ChildTwo msg={this.state.msg} />
        <ChildThree/>
      </div>
    );
  }
}
```


## 12. 受控表单和非受控表单

受控表单：设定了value值的input表单就是一个受控表单，此时的表单是不受你控制的,受react控制

```jsx
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div>
        // 这个value值无法改变，要想改变，只能通过onChange事件
        <input type="text" value="Hello!"/>
      </div>
    );
  }
}

export default App;
```

```jsx
import React, {Component} from 'react';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputVal: 'hello'
    };
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    this.setState({inputVal: event.target.value});
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.inputVal} onChange={this.handleChange}  />
      </div>
    );
  }
}

export default App;
```

不受控表单：value没有值的input是一个不受控组件。用户的任何输入都会反映到输入框中。默认值设置：`<input type="checkbox">` 和` <input type="radio">` 支持 defaultChecked，而 `<select> `和 `<textarea>` 支持 defaultValue（它仅会被渲染一次,在后续的渲染时并不起作用 ）。要获取非受控表单的值，需要借助于ref

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

| 特征                       | 不受控制表单（不推荐使用） | 受控表单 |
| -------------------------- | -------------------------- | -------- |
| 一次性检索（例如表单提交） | yes                        | yes      |
| 及时验证                   | no                         | yes      |
| 有条件的禁用提交按钮       | no                         | yes      |
| 执行输入格式               | no                         | yes      |
| 一个数据的几个输入         | no                         | yes      |
| 动态输入                   | no                         | yes      |

## 13. [ref](http://www.css88.com/react/docs/refs-and-the-dom.html)

### 使用refs的场景

- 处理focus、文本选择或者媒体播放
- 触发强制动画
- 集成第三方DOM库

注意：**尽量少用ref**

### Dom元素上使用ref

通过回调函数来实现对dom的引用

定义：`ref={(input) => { this.textInput = input; }} `

使用：`this.textInput.focus() `

## 14. 案例：TODO

![todo](https://cdn.denhuii.com/img/todo.gif)

App.js

```jsx
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {id: 0, text: 'react'}
      ]
    }
  }
  handleSubmit = (val) => {
    let id = this.state.list.length === 0 ? 0 : this.state.list[this.state.list.length - 1].id + 1
    this.setState({
      list: this.state.list.concat({ id: id, text: val })
    })
  }
  handleDel = (id) => {
    let idx = this.state.list.findIndex(item => item.id === id)
    let list = this.state.list
    list.splice(idx, 1)
    this.setState({
      list
    })
  }
  render() {
    return (
      <div>
        <Input onSubmitFn={this.handleSubmit}/>
        {
          this.state.list.map((item, index) => {
            return <List {...item} key={item.id} onDelFn={this.handleDel}/>
          })
        }
      </div>
    )
  }
}
```

Input.js

```jsx
export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVal: ''
    }
  }
  getInputVal = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }
  transferVal = (e) => {
    let val = this.state.inputVal
    if (e.keyCode === 13 && val.trim()) {
      this.props.onSubmitFn(val)
      this.setState({
        inputVal: ''
      })
    }
  }
  render() {
    return (
      <input type="text"
        value={this.state.inputVal}
        onChange={this.getInputVal}
        onKeyUp={this.transferVal}
      />
    )
  }
}
```

List.js

```js
export default class List extends Component {
  delTodo = (id) => {
    this.props.onDelFn(id)
  }
  render() {
    return (
      <li>
        {this.props.text}
        <span style={{ color: 'red', marginLeft: '40px' }} onClick={() => this.delTodo(this.props.id)}>X</span>
      </li>
    )
  }
}
```

## 15. 样式

### 内联样式

局限：hover等伪类不能够使用

```js
const styleComponent  = {
  header: {
    backgroundColor: "#333333",
    color: "#ffffff",
    "paddingTop": "15px",
    paddingBottom: "15px"
  }
}

// jsx中这样使用
<header style={styleComponent.header}></header>
```

### 从css文件引入

定义一个样式文件，直接引入（通过link标签）,然后给相应的元素加上className。它是全局的，会有污染。

也可以直接通过import引入，然后给相应的元素加上className。

### css模块化

create-react-app不支持，步骤如下：

```npm run eject // 弹出webpack的配置```

找到/config/webpack.config.js 中的第395行，在下面添加`modules: true,`表示开启css模块化

使用使用类似下面这样

`import cssHeader from (./style.css)`

``<header className={cssHeader.header}></header>``

css模块化优点

- 所有样式都是local的，解决了命名冲突和全局污染问题
- class名生成规则配置灵活,可以以此压缩class名
- 只需引用组件的js就能搞定js和css
- 依然是写css代码，没有什么学习成本

### [styled-jsx](https://github.com/zeit/styled-jsx)

vs-code插件安装`vscode-styled-jsx`

```npm install customize-cra -D``` 这个工具提供了一些方法，可以用于将我们自己添加的webpack规则合并到原有的webpack配置规则中

首先在项目根目录下面使用```npm install --save styled-jsx```安装styled-jsx，然后添加如下配置：

```js
// config-overrides.js
const { override, addBabelPlugins } = require('customize-cra');
module.exports = override(
  ...addBabelPlugins(
    [
      "styled-jsx/babel"
    ]
  )
)
```

最后注意：```npm i react-app-rewired -D```,再修改package.json文件中的scripts如下：

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```



## 16. React Router

React Router是 react 官方推荐的一款路由库。它遵循 react 万物皆组件的理念，声明式（你不需要知道它怎么做，而只需要告诉它怎么做）地控制路由跳转并渲染出指定的页面，而不需要去重载整个应用。

目前 React Router 已经更新至V4.x版本，本教程也主要围绕此版本来做相关介绍，其他版本可参考官方文档

React Router V4.x较之前版本做了较大的改动，其按单代码仓库模型来进行代码规划，打开它的 [github](https://github.com/ReactTraining/react-router) 查看其 packages 目录，可以发现React Router分为以下几个独立的部分：

- 核心部分 react-router 
- 绑定了 DOM 操作的 [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)（常用于 web 应用）
- 用在 React Native 上的 react-router-native（用于 native App）
- 用于配置静态路由的 react-router-config

单代码仓库模型的好处就是，你只需要按照自己的需求，用 npm 安装这四个中的一个即可。本文大部分示例使用的都是 react-router-dom，它与 react-router 的区别是多了很多 DOM 类组件（如 <Link> <BrowserRouter>等）

### 路由基本使用

**BrowserRouter**, **Route**, **Link**, **Switch**

下载 `npm i react-router-dom -S` 

先看一个例子，将项目目录下./src/App.js修改为：

```jsx
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const Home = () => (
  <div>我是主页</div>
)
const Content = () => (
  <div>我是内容</div>
)
const Log = () => (
  <div>我是日志</div>
)
const Nav = () => (
  <div>
    <Link to='/home'>
    主页
    </Link>
    <Link to='/content'>
    内容
    </Link>
    <Link to='/log'>
    日志
    </Link>
  </div>
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch> 
            <Route component={Nav} path='/' exact />
            <Route component={Home} path='/home' />
            <Route component={Content} path='/content' />
            <Route component={Log} path='/log' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
```

- 路由分两种模式：


1. **HashRouter** 类似于`http://localhost:8080/#/abc/def` <HashRouter>是基于 window.location.hash 和 hashchange 事件所封装的路由组件。其特点是兼容性较好。
2. **BrowserRouter** 类似于  `http://localhost:8080/abc/def` <BrowserRouter>是基于 HTML5 history API 和 popstate 事件所封装的一个高阶组件

如果有服务器端的动态支持，建议使用 ``BrowserRouter``，否则建议使用 ``HashRouter``。
原因在于，如果是单纯的静态文件，假如路径从 / 切换到 /a 后，此时刷新页面，页面将无法正常访问。

在使用时二者的替换方法很简单，我们在引入 react-router-dom 时，如以下：

```js
import { BrowserRouter as Router } from 'react-router-dom'
```

- 路由组件无法接受两个以上子元素

- 只想匹配某个路由，加exact参数，表示要求路径与location.pathname必须完全匹配

- 使用<Switch>组件来包裹一组<Route>。<Switch>会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染，后面的不会再渲染

### 渲染组件的方式

- component属性： 通过传入组件渲染，渲染时会调用 React.createElement 来生成 React 元素，适用于**大部分**场景。
- render函数： 通过传入对应的 render 函数渲染，render 函数需要返回一个 React 元素。
- children函数： 与 render 类似，也是传入需要返回一个 React 元素的函数，区别是不管路径是否匹配，传入的 children 都会渲染。

注意：*三种方法不要在同一个 <Route> 组件内使用*

三种渲染方法都会传入以下三个参数：

- match： math对象里面存储了 <Route path> 与 URL 匹配的信息
  - params - (object)  URL 动态匹配的参数，如 URL 为 "/user/:name"，你访问 "/user/chenxin"，params为：{ name: 'chenxin' }
  - isExact - (boolean) URL是否是严格匹配
  - path - (string) 用来创建嵌套的 <Route> 的匹配字段
  - url - (string) 用来创建嵌套的 <Link> 的匹配字段
- location：location 为你展示了当前页面从哪儿来，到哪里去，以及现在是什么状态。它主要有以下几个属性：
  - key - (string) 随机字符串，作为 location 的id，HashHistory 没有这个属性
  - pathname - (string) 当前页面 URL
  - search - (string) 当前 URL 的字符串参数
  - hash - (string) 当前 URL 的 hash
  - state - (object) 你要传递的 state 参数
- history： history对象实现了对会话历史的管理。
  - length - (number) 浏览历史堆栈中的数量
  - action - (string) 跳转到当前页面执行的动作（PUSH，REPLACE 或者 POP）
  - location - (object) 当前页面的 location 对象
  - location.pathname - (string) URL路径
  - location.search - (string) URL的字符参数
  - location.hash - (string) URL中的hash
  - location.state - (object) 例如在执行 push(path, state) 操作时，state会被记录到历史记录堆栈中。只适用于browser history 和 memory history
  - push(path, [state]) - (function) 在历史堆栈中加入新的条目
  - replace(path, [state]) - (function) 替换历史堆栈中当前的条目
  - go(n) - (function) 历史堆栈中的指针向前移动n，页面发生前进操作
  - goBack() - (function) 相当于go(-1)，返回上一页
  - goForward() - (function) 相当于go(1)，前进一页
  - block(prompt) - (function) 阻止跳转

### Switch, Redirect

```js
import {Redirect} from 'react-router-dom'

<Redirect to="/404">

// 编程式导航： `this.props.history.push('/xxx/')`
```

```jsx
class Product extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  jumpTo = () => {
    this.props.history.push(`${this.props.match.url}/buy`)
  }
  render() {
    return (
      <div>
        这里显示商品编号 {this.props.match.params.id} <button onClick={this.jumpTo}>选购</button>
        <Route path="/product/:id/buy" render={() => <div>我们这里有XXXXXXXX</div>}></Route>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [
        {id: 11, title: '水果'},
        {id: 22, title: '肉类'},
        {id: 33, title: '蔬菜'},
      ]
    }
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/product/11">蔬菜</Link></li>
            <li><Link to="/product/22">水果</Link></li>
            <li><Link to="/product/33">肉类</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact render={() => <div>首页</div>}></Route>
            <Route path="/product/:id" render={(props) => <Product {...props}/>}></Route>
            <Route path="/404" render={() => <div>404</div>}></Route>
            <Redirect to="/404"></Redirect>
          </Switch>
        </div>
      </Router>
    )
  }
}
```



## 17. [Redux](https://www.redux.org.cn/)

安装：```npm i -S redux```

### Redux基本概念

Redux 是 JavaScript （不是React，其他的像Angular也可以使用，甚至单纯的JavaScript也阔以使用，和react没有半毛钱关系）状态容器，提供可预测化的状态管理。
应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。

![redux](https://cdn.denhuii.com/img/Redux.png)

### Redux核心内容

  * Store
    store是Redux的实例对象，专门用来存放应用的状态，它里面保存有应用的state，action，reducer。注意：应用程序只能有**唯一一个**store
    store有以下职责：

      - 维持应用的 state；
      - 提供 getState() 方法获取 state；
      - 提供 dispatch(action) 方法更新 state；
      - 通过 subscribe(listener) 注册监听器;
      - 通过 subscribe(listener) 返回的函数注销监听器。

    ```js
    import { createStore } from 'redux'
    
    const store = createStore(userReducer);
    
    // store.subscribe()方法可以监听store的更新
    store.subscribe(() => {
        console.log("Store updated!", store.getState());
    });
    ```

  * State

    State 是一个普通对象，用来保存应用的数据。例如：

    ```js
    const initialState = {
        result: 1,
        lastValues: [],
        username: "Max"
    };
    ```

    state对象中的数据不能随意修改，要想更改state中的数据，需要用到发起一个action，这个action是一个对象，描述了你要干什么事情

  * Action

    * action

      Action 就是一个普通 JavaScript 对象，用来描述发生了什么事情。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作，type 会被定义成字符串常量。

      ```js
      {
          type: "SET_AGE",
          payload: 30
      }
      
      // 提交一个action
      store.dispatch({
        type: "SET_AGE",
        payload: 30
      });
      
      ```

      但它并没有去修改state，为了去做action描述的事情，我们需要用reducer将action和state联系起来。

    * action创建函数

      每次手动提交一个action会很麻烦，所以定义一个函数来生成action对象，这个函数就叫Action Creator.例如：

      ```js
      function addTodo(text) {
        return {
          type: ADD_TODO,
          payload: text
        }
      }
      ```

  * Reducer

    reducer是一些纯函数，它接收两个参数：当前state和action，返回值是一个新的state。
    注意：

        1. 不要修改state，而是返回一个新的对象
        2. 在 default 情况下返回旧的 state

    ```js
      const userReducer = (state = {
          name: "Max",
          age: 27
      }, action) => {
          switch (action.type) {
              case "SET_NAME":
                  state = {
                      ...state,
                      name: action.payload
                  };
                  break;
              case "SET_AGE":
                  state = {
                      ...state,
                      age: action.payload
                  };
                  break;
          }
          return state;
      };
    ```

### React 和 Redux连接

`npm i react-redux -S`

1. 如何将react 和redux进行连接，也就是如何让react应用程序拥有redux中的state

```js
import {Provider} from 'react-redux'
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
```

2. 其他组件如何调用redux中的state或者触发reducer函数呢

```js
import {connect} from "react-redux";

// 使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = (state) => {
  return {
    // state.userReducer这个userReducer，必须和上面const store = createStore(combineReducers({userReducer}));中的userReducer名字对应
    user: state.userReducer
  };
};

// 除了读取 state，容器组件还能分发 action。类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// 接下来，可以通过this.props.user.name获取state中的name值
// 通过this.props.etName('xxx')触发一个reducer
```

### redux-logger

安装：`npm i --save redux-logger`

```js
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
const store = createStore(reducer,applyMiddleware(logger))
```

### 拆分Reducer

```js
import { combineReducers } from 'redux'
// 创建一个Redux实例，让它去管理应用中的state
// combineReducers()函数会将多个不同的reducer合并成一个大的reducer函数
const store = createStore(combineReducers({userReducer, otherReducer}));
```

### redux-thunk

当处理异步请求时，比如在action中像下面这样写，就会报错，此时需要使用redux-thunk中间件

```js
export function addNum (count) {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'ADD_NUM',
        payload: count
      })
    }, 1000)
  }
}
```

安装：`npm i --save redux-thunk`

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk));
```

