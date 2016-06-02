// 原型链：原型对象等于另一个类型的实例，本质是原型重写
/*
    基本模式
    1. 默认原型，所有引用类型都继承了Object
    2. 确定原型与实例的关系：instanceof and isPrototypeof
    3. 问题：a)原型为另一类型的实例，该实例有引用类型的属性；b)创建子类型的实例时，不能向超类型的构造函数中传递参数

 */
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
// 继承
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
}
var instance = new SubType();
// console.log(instance.getSuperValue()); return true



// 借用构造函数，优点：可以向超类型传递参数
// 问题：构造函数模式的通病：方法在构造函数中定义，无法复用；超类型的原型中定义的方法，对子类型而言不可见
function SuperType(name) {
    this.colors = ["red", "green"];
    this.name = name;
}

function SubType() {
    SuperType.call(this, "sun");
}
var instance = new SubType();   //SubType的实例具有自己colors属性的副本



// 组合继承
/*
    思路：使用原型链实现对原型属性和方法的继承，借用构造函数实现对实例属性的继承
    原型上函数复用，保证每个实例都有自己的属性
    instanceof and isPrototypeOf() 能够识别基于组合继承创建的对象
 */
function SuperType(name) {
    this.colors = ["red", "green"];
    this.name = name;
};
SuperType.prototype.sayName = function() {
    console.log(this.name);
};
function SubType(name,age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age);
};
var instance1 = new SubType("sun", 23);
console.log(instance1);
