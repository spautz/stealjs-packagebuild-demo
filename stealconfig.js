steal.config({
    map: {
        '*': {
            'can/util/util.js': 'can/util/jquery/jquery.js',
            'jquery/jquery.js' : 'jquery'
        }
    },
    paths: {
        // files:
        'jquery': 'can/lib/jquery.1.9.1.js',
        // directories:
        'can/': 'lib/canjs/'
    },
    shim : {
        jquery: {
            exports: 'jQuery'
        }
    },
    ext: {
        js: 'js',
        css: 'css',
        less: 'steal/less/less.js',
        coffee: 'steal/coffee/coffee.js',
        ejs: 'can/view/ejs/ejs.js',
        mustache: 'can/view/mustache/mustache.js'
    }
});
