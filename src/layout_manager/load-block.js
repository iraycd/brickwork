layoutManager.loadBlock= function(item, setting) {
    var runtime = setting.runtime;
    var $item = $(item);
    var block = null;
    var gutterX = runtime.gutterX;
    var gutterY = runtime.gutterY;
    var fixSize = parseInt($item.attr('data-fixSize'));
    var blockId = runtime.lastId++ + '-' + runtime.totalGrid;
    
    //ignore dragging block;
    if ($item.hasClass('fw-float')) return;
    $item.attr({id: blockId, 'data-delay': item.index});

    //remove animation for speed render;
    if (setting.animate && this.transition) {
        this.setTransition(item, "");
    }
    
    // store original size;
    $item.attr('data-height') == null && $item.attr('data-height', $item.height());
    $item.attr('data-width') == null && $item.attr('data-width', $item.width());
    var height = 1 * $item.attr('data-height');
    var width = 1 * $item.attr('data-width');
    var fixPos = $item.attr('data-position');

    var cellH = runtime.cellH;
    var cellW = runtime.cellW;
    
    var col = !width ? 0 : Math.round((width + gutterX) / cellW);
    var row = !height ? 0 : Math.round((height + gutterY) / cellH);

    isNaN(fixSize) && (fixSize = null);
    // estimate size;
    if (!fixSize && setting.cellH == 'auto') {
        $item.width(cellW * col - gutterX);
        item.style.height = "";
        height = $item.height();
        row = !height ? 0 : Math.round((height + gutterY) / cellH);
    }

    if (!fixSize && setting.cellW == 'auto') {
        $item.height(cellH * row - gutterY);
        item.style.width = "";
        width = $item.width();
        col = !width ? 0 : Math.round((width + gutterX) / cellW);
    }
    
    // for none resize block;
    if ((fixSize != null) && (col > runtime.limitCol || row > runtime.limitRow)) {
        block = null;
    } else {
        // get smallest width and smallest height of block;
        // using for image runtime;
        row && row < runtime.minHoB && (runtime.minHoB = row);
        col && col < runtime.minWoB && (runtime.minWoB = col);

        // get biggest width and biggest height of block;
        row > runtime.maxHoB && (runtime.maxHoB = row);
        col > runtime.maxWoB && (runtime.maxWoB = col);

        width == 0 && (col = 0);
        height == 0 && (row = 0);

        block = {
            id: blockId,
            width: col,
            height: row,
            fixSize: fixSize
        };

        // for fix position;
        if (fixPos) {
            fixPos = fixPos.split("-");
            block.y = 1 * fixPos[0];
            block.x = 1 * fixPos[1];
            block.width = fixSize != null ? col : Math.min(col, runtime.limitCol - block.x);
            block.height = fixSize != null ? row : Math.min(row, runtime.limitRow - block.y);
            var holeId = block.y + "-" + block.x + "-" + block.width + "-" + block.height;
            runtime.holes[holeId] = {
                id: block.id,
                top: block.y,
                left: block.x,
                width: block.width,
                height: block.height
            };
            this.setBlock(block, setting);
        }
    }

    // for css animation;
    if ($item.attr("data-state") == null) {
        $item.attr("data-state", "init");
    } else {
        $item.attr("data-state", "move");
    }

    setting.onBlockReady.call(item, block, setting);

    return fixPos ? null : block;
}