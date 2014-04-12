layoutManager.adjustUnit= function(width, height, setting) {
    var gutterX = setting.gutterX;
    var gutterY = setting.gutterY;
    var runtime = setting.runtime;
    var cellW = setting.cellW;
    var cellH = setting.cellH;

    $.isFunction(cellW) && (cellW = cellW(width));
    cellW = 1 * cellW;
    !$.isNumeric(cellW) && (cellW = 1);
    
    $.isFunction(cellH) && (cellH = cellH(height));
    cellH = 1 * cellH;
    !$.isNumeric(cellH) && (cellH = 1);

    if ($.isNumeric(width)) {
        // adjust cell width via container;
        cellW < 1 && (cellW = cellW * width);

        // estimate total columns;
        var limitCol = Math.max(1, Math.floor(width / cellW));

        // adjust unit size for fit width;
        if (!$.isNumeric(gutterX)) {
            gutterX = (width - limitCol * cellW) / Math.max(1, (limitCol - 1));
            gutterX = Math.max(0, gutterX);
        }

        limitCol = Math.floor((width + gutterX) / cellW);
        runtime.cellW = (width + gutterX) / Math.max(limitCol, 1);
        runtime.cellS = runtime.cellW / cellW;
        runtime.gutterX = gutterX;
        runtime.limitCol = limitCol;
    } 

    if ($.isNumeric(height)) {
        // adjust cell height via container;
        cellH < 1 && (cellH = cellH * height);

        // estimate total rows;
        var limitRow = Math.max(1, Math.floor(height / cellH));

        // adjust size unit for fit height;
        if (!$.isNumeric(gutterY)) {
            gutterY = (height - limitRow * cellH) / Math.max(1, (limitRow - 1));
            gutterY = Math.max(0, gutterY);
        }

        limitRow = Math.floor((height + gutterY) / cellH);
        runtime.cellH = (height + gutterY) / Math.max(limitRow, 1);
        runtime.cellS = runtime.cellH / cellH;
        runtime.gutterY = gutterY;
        runtime.limitRow = limitRow;
    } 

    if (!$.isNumeric(width)) {
        // adjust cell width via cell height;
        cellW < 1 && (cellW = runtime.cellH);
        runtime.cellW = cellW != 1 ? cellW * runtime.cellS : 1;
        runtime.gutterX = gutterX;
        runtime.limitCol = 666666;
    }

    if (!$.isNumeric(height)) {
        // adjust cell height via cell width;
        cellH < 1 && (cellH = runtime.cellW);
        runtime.cellH = cellH != 1 ? cellH * runtime.cellS : 1;
        runtime.gutterY = gutterY;
        runtime.limitRow = 666666;
    }
}