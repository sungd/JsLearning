function Dialog (opt) {
    this.options = {
        title: '对话框',
        content: '',
        width: 200,
        height: 'auto',
        left: null,     // 位置
        top: null,
        drag_able: false,   // 是否可拖拽
        callback: null,      // 关闭后的回调
        close_time: 0,      // 自动关闭时间
        buttons: ['close', 'cancel', 'ok']  // 按钮集
    };
    
    extent(this.options, opt);
    function extent(obj1, obj2) {
        if (obj2) {
            for (var key in obj2) {
                obj1[key] = obj2[key];
            }
        }
    }

    this.init();
}

Dialog.prototype.init = function() {
    this.dialog_modal = document.createElement('div');
    this.dialog_modal.classList.add('dialog');
    var inner = ['<div class="dialog-hd">', '<span class="title"></span>', '<span class="close-btn">关闭</span>',
                '</div><div class="dialog-bd"></div>', '<div class="dialog-ft">', '<button class="btn ok">确认</button></div>'].join('');
    this.dialog_modal.innerHTML = inner;
    document.body.appendChild(this.dialog_modal);

    var title = document.querySelector('.dialog .title');
    title.innerHTML = this.options.title;
    var content = document.querySelector('.dialog .dialog-bd');
    content.innerHTML = this.options.content;

    this.bindEvent();
};

Dialog.prototype.bindEvent = function() {
    var self = this;
    var closeBtn = document.querySelector('.dialog .close-btn');
    closeBtn.addEventListener('click', function(e) {
        document.body.removeChild(self.dialog_modal);
    });

    var okBtn = document.querySelector('.dialog-ft .ok');
    okBtn.addEventListener('click', function(e) {
        document.body.removeChild(self.dialog_modal);
    });

    if (self.options.close_time) {
        setTimeout(function() {
            document.body.removeChild(self.dialog_modal);
        }, self.options.close_time);
    }
};

Dialog.prototype.show = function() {
     this.dialog_modal.classList.add('show');    
};

Dialog.prototype.close = function() {
    this.dialog_modal.classList.remove('show');
}