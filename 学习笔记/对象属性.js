/*
    对象属性：
    1. 数据属性    
    特性：[[Configurable]],[[Enumerable]],[[Writable]],[[Value]]
    通过Object.defineProperty()修改属性的默认特性

    2. 访问器属性
    特性：[[Configurable]],[[Enumerable]],[[Get]],[[Set]]
    通过Object.defineProperty()来定义，设置一个访问器属性的值会导致其他属性发生变化
    举例：
 */

var book = {
    _year: 2000,   //_开头表示只能通过对象方法访问的属性
    edition: 1
};

Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if(newValue > 2001) {
            this._year = newValue;
            edition = newValue - 2001;
        }
    }
});

book.year = 2005;
console.log(book.edition);
var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);
console.log(descriptor.enumerable);
console.log(descriptor.get);
