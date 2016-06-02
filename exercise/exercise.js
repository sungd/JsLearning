//define
(function(window) {
    function fn(str) {
        this.str = str;
    }
 
    fn.prototype.format = function() {
        var arg = arguments;
        return this.str.replace(/\{(\d+)\}/ig, function(a, b) {
            return arg[b] || "";
        });
    }
    window.fn = fn;
})(window);
 
//use
(function() {
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
})();