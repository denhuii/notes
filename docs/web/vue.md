# Vue

## 常用指令

- v-if：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。
- v-show：根据表达式之真假值，切换元素的 display CSS 属性。
- v-for：循环指令，基于一个数组或者对象渲染一个列表，vue 2.0以上必须需配合 key值 使用。
- v-bind：动态地绑定一个或多个特性，或一个组件 prop 到表达式。
- v-on：用于监听指定元素的DOM事件，比如点击事件。绑定事件监听器。
- v-model：实现表单输入和应用状态之间的双向绑定
- v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- v-once：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

------

## v-if 和 v-show 的区别

**共同点：**

`v-if` 和 `v-show` 都是动态显示DOM元素。

**区别：**

1. 编译过程：` v-if `是 真正的条件渲染，因为它会确保在切换过程中条件块内的`事件监听器`和`子组件`适当地`被销毁`和`重建`。`v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性`display`。

2. 编译条件：` v-if` 是惰性的：如果在初始渲染时条件为假，则什么也不做。直到条件第一次变为真时，才会开始渲染条件块。`v-show`不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

3. 性能消耗：`v-if`有更高的切换消耗。`v-show`有更高的初始渲染消耗。

4. 应用场景： `v-if`适合运行时条件很少改变时使用。`v-show`适合频繁切换。

------

## vue常用的修饰符

### **v-on 指令常用修饰符：**

- .stop - 调用 event.stopPropagation()，禁止事件冒泡。
- .prevent - 调用 event.preventDefault()，阻止事件默认行为。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
- .native - 监听组件根元素的原生事件。
- .once - 只触发一次回调。
- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

**注意：** 如果是在自己封装的组件或者是使用一些第三方的UI库时，会发现并不起效果，这时就需要用`.native`修饰符了，如：

```vue
<el-input
  v-model="inputName"
  placeholder="搜索你的文件"
  @keyup.enter.native="searchFile(params)"
  >
</el-input>
```

### **v-bind 指令常用修饰符：**

- .prop - 被用于绑定 DOM 属性 (property)。(差别在哪里？)
- .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
- .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

### **v-model 指令常用修饰符：**

- .lazy - 取代 input 监听 change 事件
- .number - 输入字符串转为数字
- .trim - 输入首尾空格过滤

------

## vue事件中如何使用event对象

注意在事件中要使用 $ 符号

```js
//html部分
<a href="javascript:void(0);" data-id="12" @click="showEvent($event)">event</a>
//js部分
showEvent(event){
    //获取自定义data-id
	console.log(event.target.dataset.id)
   //阻止事件冒泡
    event.stopPropagation(); 
    //阻止默认
    event.preventDefault()
}
```

------

## $nextTick的使用

场景：有一个`div`，默认用 `v-if` 将它隐藏，点击一个按钮后，改变 `v-if` 的值，让它显示出来，同时拿到这个`div`的文本内容。如果`v-if`的值是 false，直接去获取`div`内容是获取不到的，因为此时`div`还没有被创建出来，那么应该在点击按钮后，改变`v-if`的值为 true，div才会被创建，此时再去获取，示例代码如下：

```html
<div id="app">
    <div id="div" v-if="showDiv">这是一段文本</div>
    <button @click="getText">获取div内容</button>
</div>
<script>
var app = new Vue({
    el : "#app",
    data:{
        showDiv : false
    },
    methods:{
        getText:function(){
            this.showDiv = true;
            var text = document.getElementById('div').innnerHTML;
             console.log(text);
        }
    }
})
</script>
```

这段代码并不难理解，但是运行后在控制台会抛出一个错误：`Cannot read property 'innnerHTML of null`，意思就是获取不到`div`元素。这里就涉及`Vue`一个重要的概念：异步更新队列。

> 异步更新队列

Vue在观察到数据变化时并不是直接更新DOM，而是开启一个队列，并缓冲在同一个事件循环中发生的所以数据改变。在缓冲时会去除重复数据，从而避免不必要的计算和DOM操作。然后，在下一个事件循环`tick`中，Vue刷新队列并执行实际（已去重的）工作。所以如果你用一个for循环来动态改变数据100次，其实它只会应用最后一次改变，如果没有这种机制，DOM就要重绘100次，这固然是一个很大的开销。

Vue会根据当前浏览器环境优先使用原生的`Promise.then`和`MutationObserver`，如果都不支持，就会采用`setTimeout`代替。
知道了Vue异步更新DOM的原理，上面示例的报错也就不难理解了。事实上，在执行`this.showDiv = true`时，div仍然还是没有被创建出来，直到下一个`vue`事件循环时，才开始创建。`$nextTick`就是用来知道什么时候DOM更新完成的，所以上面的示例代码需要修改为：

```html
<div id="app">
    <div id="div" v-if="showDiv">这是一段文本</div>
    <button @click="getText">获取div内容</button>
</div>
<script>
var app = new Vue({
    el : "#app",
    data:{
        showDiv : false
    },
    methods:{
        getText:function(){
            this.showDiv = true;
            this.$nextTick(function(){
                  var text = document.getElementById('div').innnerHTML;
                 console.log(text);  
            });
        }
    }
})
</script>
```

这时再点击事件，控制台就打印出div的内容“这是一段文本“了。
理论上，我们应该不用去主动操作DOM，因为Vue的核心思想就是数据驱动DOM，但在很多业务里，我们避免不了会使用一些第三方库，比如 popper.js、swiper等，这些基于原生`javascript`的库都有创建和更新及销毁的完整生命周期，与Vue配合使用时，就要利用好$nextTick。