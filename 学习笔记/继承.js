// 原型链：原型对象等于另一个类型的实例，本质是原型重写
// 基本模式
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType = function() {
    this.subproperty = false;
}
// 继承
SubType.prototype = new SubType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue()); //return true

1. 默认原型，所有引用类型都继承了Object
2. 确