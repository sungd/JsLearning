javascript 函数技巧


1 安全的类型检测

Object.prototype.toString.call();
检测原生对象类型，返回[Object NativeConstructorName]
自定义构造函数返回[Object Object]


2 作用域安全的构造函数

function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides;
    } else {
        return new Polygon(sides);
    }
}

function Rect(width, height) {
    Polygon.call(this, 2);
    this.width = width;
    this.height = height;
}

Rect.prototype = new Polygon();


3 惰性载入函数

代码中包含大量的if语句，如果if语句不必每次再执行，可以提升性能。

var createFun = (function() {
    if(xxx)
        return function() {};
    else {
        return function() {};
    } 
})();

4 函数绑定

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    };
}
常和回调函数一起使用，函数作为变量传递的同时保留代码执行环境


5 函数柯里化

用于创建已经设置好了一个或多少参数的函数
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1); //获取第一个参数之外的参数
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}

柯里化和绑定提供了强大的动态函数创建功能，但会带来额外的开销。

6 防止篡改对象

1）不可拓展对象： Object.preventExtensions()，对象不可添加属性
2）密封的对象： Object.seal()，对象不可拓展和删除属性
3）冻结的对象： Object.freeze()，既不可拓展，又是密封的，不可写

未完待续。。。。。

管理内存：
Javascript具备垃圾收集机制，但浏览器的占用的内存较小，一旦数据不再有用，通过设置其值为NULL来释放引用。让值脱离执行环境，以便垃圾收集器在下次运行时回收。


AJax：

XMLHttpRequest:
responseText
responseXML
status
statusText
readystate: 0-4，2发送，3接收，4完成

var xhr = createXHR();
xhr.onreadystatechange = function() {
    if(xhr.readystate == 4) {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert(xhr.status);
        }
    }
}
xhr.open("get", "url", true); //异步
xhr.setRequestHeader("key", value);
xhr.send(null);

Get请求，查询字符串中每个参数必须用encodeURIComponent()编码
从性能角度看，GET请求的速度可以达到POST请求的两倍

JSONP:JSON with padding
前提：script的src不受同源策略限制
举个例子：
function handleResponse(response) {
    alert(response.data);
}

var script = document.createElement("script");
script.src = "http://xxxx?callback=handleResponse";
document.body.appendChild(script);
优点：直接访问响应文本，直接在浏览器和服务器之间双向通信
不足：从其他域加载代码执行，不安全；不容易确定JSONP请求是否失败


Comet:服务器向页面推送数据的技术－－长轮询和流
传统轮询：短轮询－>长轮询
长轮询：页面发起一个到服务器的请求，服务器保持打开，直到有数据可以发送，发送完数据后，浏览器关闭连接，随即又发起一个到服务器的新请求。
HTTP流：浏览器向服务器发送一个请求，服务器保持打开，周期性地向浏览器发送数据。

服务器发送事件：
Web sockets:全双工，双向通信，自定义协议wx://
SSE:到服务器的单向连接，服务器通过连接发送任意数量的数据，支持短轮询、长轮询、HTTP流