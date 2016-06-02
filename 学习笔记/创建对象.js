/////////
//创建对象
/////////

// 对象字面量，缺点：同一接口创建对象，大量冗余代码
var person = {
    name: "xxx",
    age: 23,
    sayName: function() {
        console.log(this.name);
    }
};

// 工厂模式：抽象了创建具体对象的过程，缺点：不知道一个对象的类型
function createPerson(name, age) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}

// 构造函数模式：自定义构造函数，优点：可以将实例标记为一种特定的类型；缺点：每个方法都要在实例中创建一遍
/*
    new操作符：
    1）创建一个新对象
    2）将构造函数的作用域赋给新对象
    3）执行构造函数代码
    4）返回❤️对象
*/
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    };
}
var person1 = new Person("sun", 23);
// 一种解决方案：函数转移到外部，缺点：sayName作为全局变量只能被某个对象调用；需定义多个全局函数，破坏封装性
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}

function sayName() {
    console.log(this.name);
};


// 原型模式
/*
    理解构造函数、原型对象、对象实例间的关系
    属性查找时会沿着原型链搜索，直到某个对象的原型为NULL为止
    in, for-in 会在通过对象能够访问给定属性时返回true，无论是在实例中还是在原型中，可枚举类型
    Object.hasOwnProperty(): 只有在属性存在于实例中返回true

    ❤❤缺点❤❤：
    1. 省略了为构造函数初始化参数，实例默认取得相同的属性值
    2. 属性被实例共享，对于引用类型值，修改会影响其他实例️

    不会搜索原型链
    1. Object.keys():取得对象上所有的可枚举实例属性
    2. Object.getOwnPropertyNames():所有的实例属性，无论是否可枚举
*/
function hasPrototypeProperty(object, name) { //只有在属性存在于原型中返回true
    return !Object.hasOwnProperty(name) && (name in object);
}

function Person() {}
Person.prototype = {
    name: "xxx",
    age: 23,
    sayName: function() {
        console.log(this.name);
    }
};
Object.defineProperty(Person.prototype, "construtor", {
    enumerable: false,
    value: Person
});

/*
    重写原型对象时，instanceof 仍然有用，需注意是否需要construtor属性
    重写原型对象切断了现有原型和之前已经存在的对象实例之间的联系，他们引用的仍然是最初的原型
 */
function Person() {}
var friend = new Person();
Person.prototype = {
    construtor: Person,
    name: "xxx",
    age: 23,
    sayName: function() {
        console.log(this.name);
    }
};
// friend.sayName(); error

/////////////////////
//❤️❤️❤️❤️❤️组合使用构造函数模式和原型模式❤️❤️❤️❤️❤️
/////////////////////
/*
    1. 构造函数模式用于定义实例属性
    2. 原型模式用于定义方法和共享的属性
 */
function Person(name, age) {
    this.name =  name;
    this.age = age;
    this.friend = ["she","her"];
}
Person.prototype = function() {
    construtor: Person,
    sayName: function() {
        console.log(this.name);
    }
};

// 动态原型模式
// 通过检查某个应该存在的方法是否有效，决定是否需要初始化原型
function Person(name, age) {
    // 属性
    this.name =  name;
    this.age = age;
    // 方法
    if(typeof this.sayName != "function") {
        Person.prototype.sayName = function() {
            console.log(this.name);
        };
    }
}


// 寄生构造函数模式
// 返回的对象与构造函数的原型属性没有关系，无法用instanceof确定对象类型
function Person(name, age) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}
var friend = new Person("xxx", 23);

//稳妥构造函数模式
//没有公共属性，方法不引用this的对象，不使用new调用构造函数
function Person(name, age) {
    var o = new Object();
    o.sayName = function() {
        console.log(name);
    };
    return o;
}