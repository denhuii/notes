# TypeScript

## 语言类型

### 强类型语言

### 弱类型语言

### 静态类型语言

### 动态类型语言

## 数据类型

### ES6

- Boolean
- Number
- String
- Array
- Function
- Object
- Symbol
- undefined
- null

### TypeScript的数据类型

- Boolean

  ```ts
  let bool: bollean = true
  ```

- Number

  ```ts
  let num: number = 123
  ```

- String

  ```ts
  let str: string = 'abc'
  ```

- Array

  ```ts
  let arr1: number[] = [1, 2, 3]
  let arr2: Array<number | string> = [1, 2, 3, '4']
  ```

- Function

  ```ts
  let add = (x: number, y: number) => x + y
  let compute: (x: number, y: number) => number
  compute = (a, b) => a + b;
  ```

- Object

  ```ts
  let obj: onbject = {x: 1,y: 2}
  let obj: {x : number, y: number} = {x: 1,y: 2}
  ```

- Symbol

  ```ts
  let s1: symbol = Symbol()
  let s2 = Symbli()
  ```

- undefined

  ```ts
  let un: undefind = undefind
  ```

- null

  ```ts
  let nu : null
  ```

- **void**

  ```ts
  let noReturn = () => {}
  ```

- **any**

  ```ts
  let a
  ```

- **never**

  ```ts
  let error = () => {
      throw new Error('error')
  }
  let endlesss = () => {
      while(true) {}
  }
  ```

- **元组**

  ```ts
  let tuple: [number, string] = [0, '1']
  ```

- **枚举**，一组有名字的常量集合

  - 数字枚举

    ```ts
    enum Role {
        Reporter,
        Developer,
        Maintainer,
        Owner,
        Guest
    }
    ```

  - 字符串枚举

    ```ts
    enum Message {
        Success = '恭喜你，成功了',
        Sail = '抱歉，失败了'
    }
    ```

  - 异构枚举

    ```ts
    enum Answer {
        N,
        Y = 'Yes'
    }
    ```

- **高级类型**

## 类型注解

- #### 作用相当于强类型语言中的类型声明

- #### 语法：(变量/函数):**type**

##  接口

- 对象类型接口

  ```ts
  interface List {
    // 设置 只读属性 readonly
    readonly id: number;
    name: string;
    [x: string]: any;
  }
  interface Result {
    data: List[];
    code?: number;
  }
  function render(result: Result) {
    if (result.code) {
      console.log(result.code);
    }
    result.data.forEach((value) => {
      console.log(value.id, value.name);
    });
  }
  
  render({
    data: [
      { id: 1, name: 'A' },
      {
        id: 2,
        name: 'B',
        age: '20',  // 这里会报错
      },
    ],
    code: 200,
  });
  // 如果返回有多余的属性，就会报错 解决有三种方式
  
  // 1.用一个变量保存起来，如上代码
  // let result = {
  //   data: [
  //     { id: 1, name: 'A' },
  //     {
  //       id: 2,
  //       name: 'B',
  //     },
  //   ],
  //   code: 200,
  // };
  // render(result);
  
  // 2.类型断言 as
  // render({
  //   data: [
  //     { id: 1, name: 'A' },
  //     {
  //       id: 2,
  //       name: 'B',
  //     },
  //   ],
  //   code: 200,
  // } as Result);
  
  // 3.使用字符串索引签名
  
  
  interface StringArray {
    [index: number]: string;
  }
  let chars: StringArray = ['A', 'B'];
  
  interface Names {
    [x: string]: any;
    [z: number]: number;
  }
  
  ```

  

- 函数类型接口

  ```ts
  // 1.用接口定义函数类型
  // let add: (x: number, y: number) => number;
  
  // interface Add {
  //   (x: number, u: number): number;
  // }
  
  type Add = (x: number, y: number) => number;
  
  let add: Add = (a, b) => a + b;
  
  interface Lib {
    (): void;
    version: string;
    doSomething(): void;
  }
  
  function getLib() {
    let lib: Lib = (() => {}) as Lib;
    lib.version = '1.0';
    lib.doSomething = () => {};
    return lib;
  }
  
  let lib1 = getLib();
  lib1();
  lib1.doSomething();
  
  let lib2 = getLib();
  ```

  

## 函数

### 函数定义方法

```ts
function add1(x: number, y: number) {
  return x + y;
}

let add2: (x: number, y: number) => number;

type add3 = (x: number, y: number) => number;

interface add4 {
  (x: number, y: number): number;
}

// 添加可选参数 可选参数必须位于必选参数之后
function add5(x: number, y?: number) {
  return y ? x + y : x;
}

// 给参数添加默认值
function add6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q;
}
// 在必选参数前 默认参数是不可以省略的，严格传入undefined来获取默认值

// 参数不确定时 定义剩余参数
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
```

### 函数重载

> 两个函数如果名称相同，但是参数个数或者类型不同，就实现了函数重载
>
> 函数重载的好处，不需要用功能相似的函数定义不同的名称，增加函数可读性

```ts
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === 'string') {
    return rest.join('');
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur);
  }
  console.log(typeof first === 'number');
}

console.log(add8(1, 2, 3));
console.log(add8('1', '2', '3'));
```

