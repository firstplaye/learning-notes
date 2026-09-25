# this关键字
在 JavaScript 中，this 是一个特殊的关键字，它指向当前函数执行时所关联的对象。

# 1.this的使用场合
## (1)全局环境  
全局环境使用this，它指的就是顶层对象window。  
不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。  
```js
  function f() {
        console.log(this === window);
        console.log(this.toString());
    }
  f(); // true
```
非严格模式下，this 通常指向 window。  
严格模式下，this 是 undefined。 

## (2)构造函数  
构造函数中的this，指的是实例对象。  
如果不用new调用构造函数,this指向window。  
```js
  function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    People('小红', 12, '男');
    const a = new People('小明', 12, '男');//构造函数中的this指向a
    console.log(a.name);
    console.log(this.name);//this指向window
```

## (3)对象的方法
对象的方法中的this指向对象，但是方法中的方法指向的是window
```js
  application = {
        id: 1,
        name: "xiaoming",
        showStatus() {

            console.log(`${this.id}: ${this.name}`);//指向application
            let f = function () {
                console.log(this); //指向的window
            };
            f();
        },
    };
    
    application.showStatus();
```

## (4)箭头函数：继承外层的 this
箭头函数与普通函数不同，它没有自己的 this。
```
const person = {
  name: "小明",

  sayName() {
    const fn = () => {
      console.log(this.name);
    };

    fn();
  }
};

person.sayName(); // 小明
```
sayName() 的 this 指向 person。

# 2.如何改变 this 的指向？
## 1. call()：指定 this 并立即调用
函数.call(this指向, 参数1, 参数2, ...);
```
function introduce(city) {
  console.log(this.name + "来自" + city);
}

const person = {
  name: "小明"
};

introduce.call(person, "东京");
```
## 2.apply()：指定 this，参数使用数组传入
函数.apply(this指向, [参数1, 参数2]);
```
function introduce(city, age) {
  console.log(this.name, city, age);
}

const person = {
  name: "小明"
};

introduce.apply(person, ["东京", 20]);
```
## 3. bind()：绑定 this，返回新函数
bind() 不会立即执行函数，而是返回一个绑定了 this 的新函数。
```
function sayName() {
  console.log(this.name);
}

const person = {
  name: "小明"
};

const fn = sayName.bind(person);

fn(); // 小明
```
bind(person) 创建一个新函数。新函数的 this 被绑定到 person。调用 fn() 时，this 仍然指向 person。
## 4.`call()`、`apply()`、`bind()` 的区别

| 对比 | `call()` | `apply()` | `bind()` |
|---|---|---|---|
| 指定 `this` | 是 | 是 | 是 |
| 是否立即执行 | 是 | 是 | 否 |
| 参数传递 | 逐个传入 | 数组传入 | 可预先传入 |
| 返回值 | 函数执行结果 | 函数执行结果 | 新函数 |