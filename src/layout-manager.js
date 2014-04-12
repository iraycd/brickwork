var layoutManager = {
    // default setting;
    defaultConfig: {
        animate: false,
        cellW: 100, // function(container) {return 100;}
        cellH: 100, // function(container) {return 100;}
        delay: 0, // slowdown active block;
        engine: 'giot', // 'giot' is a person name;
        fixSize: null, // resize + adjust = fill gap;
        //fixSize: 0, allow adjust size = no fill gap;
        //fixSize: 1, no resize + no adjust = no fill gap;
        gutterX: 15, // width spacing between blocks;
        gutterY: 15, // height spacing between blocks;
        selector: '> div',
        draggable: false,
        rightToLeft: false,
        bottomToTop: false,
        onGapFound: function() {},
        onComplete: function() {},
        onResize: function() {},
        onBlockReady: function() {},
        onBlockFinish: function() {},
        onBlockActive: function() {}
    },
    plugin: {},
    totalGrid: 1,
    transition: false,
};