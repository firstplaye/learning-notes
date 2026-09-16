# this关键字

# 1.this的使用场合
(1)全局环境  
全局环境使用this，它指的就是顶层对象window。  
不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。  
```js
  function f() {
        console.log(this === window);
        console.log(this.toString());
    }
  f(); // true
```

(2)构造函数  
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

(3)对象的方法
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

(4)绑定this的方法  
call()，apply() ，bind()  
让一个函数执行，并且在这次执行中，让这个函数内部的 this 指向你传入的对象。  
`call(this: Function, thisArg: any, ...argArray: any[]): any;`

(5)箭头函数没有自己的 this


