layoutManager.setBlock= function(block, setting) {
    var runtime = setting.runtime;
    var gutterX = runtime.gutterX;
    var gutterY = runtime.gutterY;
    var height = block.height;
    var width = block.width;
    var cellH = runtime.cellH;
    var cellW = runtime.cellW;
    var x = block.x;
    var y = block.y;

    if (setting.rightToLeft) {
        x = runtime.limitCol - x - width;
    }
    if (setting.bottomToTop) {
        y = runtime.limitRow - y - height;
    }

    var realBlock = {
        fixSize: block.fixSize,
        top: y * cellH,
        left: x  * cellW,
        width: cellW * width - gutterX,
        height: cellH * height - gutterY
    };
    
    realBlock.top = 1 * realBlock.top.toFixed(2);
    realBlock.left = 1 * realBlock.left.toFixed(2);
    realBlock.width = 1 * realBlock.width.toFixed(2);
    realBlock.height = 1 * realBlock.height.toFixed(2);

    //runtime.length += 1;
    block.id && (runtime.blocks[block.id] = realBlock);

    // for append feature;
    return realBlock;
}