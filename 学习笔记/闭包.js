/*
    函数表达式与函数声明
    特征：函数声明提升（执行代码前会先读取函数声明）
    匿名函数（拉姆达函数）
 */

/*
    闭包：有权访问另外一个函数作用域中的变量的函数
    方式：一个函数内部创建另一个函数
    用途：a)读取外部函数中的变量； b）让变量保存在内存中

    1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
    2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
 */
function createFunction() {
    var result = [];
    for(var i = 0; i < 10; i++) {
        result[i] = function(num) {
            return function() {
                return num;
            }
        }(i);
    }
}

function assignHandler() {
    var ele = document.getElementById("id");
    ele.onclick = function() {
        console.log(ele.id);
    };
}
// ===>取得对象的副本，解除对象的引用，及时回收内存
function assignHandler() {
    var ele = document.getElementById("id");
    var id = ele.id;
    ele.onclick = function() {
        console.log(id);
    };
    ele = null;
}


/*
    模仿块级作用域
 */
(function() {
    // 块级作用域
})();


/*
    模拟私有变量：构造函数模式，缺点：针对每个实例会创建同样一组方法
    静态私有变量：原型模式
 */
function Person(name) {
    this.getName = function() {
        return name;
    };
    this.setName = function(value) {
        name = value;
    };
}
// name成为静态的、由所有实例共享的属性
(function() {
    var name = "";
    Person = function(value) {name = value};;
    Person.prototype.getName = function(){return name;};
    Person.prototype.setName = function(value){name = value;};
})();

/*
    模块模式：创建一个对象并以某些数据对其进行初始化，还要公开一些能够访问这些私有数据的方法，可以使用模块模式
 */
var Application = function() {
    // 私有
    var components = [];
    components.push(10);

    // 公共
    return {
        getComponent: function() {
            return components.length;
        },
        registerComponent: function(component) {
            if(typeof component == "object")
                component.push(component);
        }
    };
}();