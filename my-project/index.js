fis.config.merge({
    roadmap: {
        path: [{
            //所有widget目录下的js文件
            reg: 'widget/**.js',
            //是模块化的js文件（标记为这种值的文件，会进行amd或者闭包包装）
            isMod: true,
            //默认依赖lib.js
            requires: ['lib.js'],
            //向产出的map.json文件里附加一些信息
            extras: { say: '123' },
            //编译后产出到 /static/widget/xxx 目录下
            release: '/static$&'
        }]
    }
});
