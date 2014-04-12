layoutManager.setWallSize= function(runtime, container) {
    var totalRow = runtime.totalRow;
    var totalCol = runtime.totalCol;
    var gutterY = runtime.gutterY;
    var gutterX = runtime.gutterX;
    var cellH = runtime.cellH;
    var cellW = runtime.cellW;
    var totalWidth = Math.max(0, cellW * totalCol - gutterX);
    var totalHeight = Math.max(0, cellH * totalRow - gutterY);
    
    container.attr({
        'data-total-col': totalCol,
        'data-total-row': totalRow,
        'data-wall-width': Math.ceil(totalWidth),
        'data-wall-height': Math.ceil(totalHeight)
    });

    if (runtime.limitCol < runtime.limitRow) {
        // do not set height with nesting grid;
        !container.attr("data-height") && container.height(Math.ceil(totalHeight));
    }
}