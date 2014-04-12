var engine = {
    // Giot just a person name;
    giot: function(items, setting) {
        var runtime = setting.runtime,
            row = runtime.limitRow,
            col = runtime.limitCol,
            x = 0,
            y = 0,
            maxX = runtime.totalCol,
            maxY = runtime.totalRow,
            wall = {},
            holes = runtime.holes,
            block = null,
            matrix = runtime.matrix,
            bigLoop = Math.max(col, row),
            freeArea = null,
            misBlock = null,
            fitWidth = col < row ? 1 : 0,
            lastBlock = null,
            smallLoop = Math.min(col, row);

        // fill area with top, left, width, height;
        function fillMatrix(id, t, l, w, h) {
            for (var y = t; y < t + h;) {
                for (var x = l; x < l + w;) {
                    matrix[y + '-' + x] = id;
                    ++x > maxX && (maxX = x);
                }
                ++y > maxY && (maxY = y);
            }
        }
        
        // set a hole on the wall;
        for (var i in holes) {
            if (holes.hasOwnProperty(i)) {
                fillMatrix(holes[i]["id"] || true, holes[i]['top'], holes[i]['left'], holes[i]['width'], holes[i]['height']);
            }
        }
        

        for (var b = 0; b < bigLoop; ++b) {
            if (!items.length) break;
            fitWidth ? (y = b) : (x = b);
            lastBlock = null;

            for (var s = 0; s < smallLoop; ++s) {
                if (!items.length) break;
                fitWidth ? (x = s) : (y = s);
                if (runtime.matrix[y + '-' + x]) continue;
                freeArea = layoutManager.getFreeArea(y, x, runtime);
                block = null;
                for (var i = 0; i < items.length; ++i) {
                    if (items[i].height > freeArea.height) continue;
                    if (items[i].width > freeArea.width) continue;
                    block = items.splice(i, 1)[0];
                    break;
                }

                // trying resize the other block to fit gap;
                if (block == null && setting.fixSize == null) {
                    // resize near block to fill gap;
                    if (lastBlock && !fitWidth && runtime.minHoB > freeArea.height) {
                        lastBlock.height += freeArea.height;
                        fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                        layoutManager.setBlock(lastBlock, setting);
                        continue;
                    } else if (lastBlock && fitWidth && runtime.minWoB > freeArea.width) {
                        lastBlock.width += freeArea.width;
                        fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                        layoutManager.setBlock(lastBlock, setting);
                        continue;
                    } else {
                        // get other block fill to gap;
                        for (var i = 0; i < items.length; ++i) {
                            if (items[i]['fixSize'] != null) continue;
                            block = items.splice(i, 1)[0];
                            if (fitWidth) {
                                block.width = freeArea.width;
                                if (setting.cellH == 'auto') {
                                    layoutManager.adjustBlock(block, setting);
                                }
                                // for fitZone;
                                block.height = Math.min(block.height, freeArea.height);
                            } else {
                                block.height = freeArea.height;
                                // for fitZone;
                                block.width = Math.min(block.width, freeArea.width);
                            }
                            break;
                        }
                    }
                }
                
                if (block != null) {
                    wall[block.id] = {
                        id: block.id,
                        x: x,
                        y: y,
                        width: block.width,
                        height: block.height,
                        fixSize: block.fixSize
                    };
                    
                    // keep success block for next round;
                    lastBlock = wall[block.id];

                    fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                    layoutManager.setBlock(lastBlock, setting);
                } else {
                    // get expect area;
                    var misBlock = {
                        x: x,
                        y: y,
                        fixSize: 0
                    };
                    if (fitWidth) {
                        misBlock.width = freeArea.width;
                        misBlock.height = 0;
                        var lastX = x - 1;
                        var lastY = y;
                        
                        while (matrix[lastY + '-' + lastX]) {
                            matrix[lastY + '-' + x] = true;
                            misBlock.height += 1;
                            lastY += 1;
                        }
                    } else {
                        misBlock.height = freeArea.height;
                        misBlock.width = 0;
                        var lastY = y - 1;
                        var lastX = x;
                        
                        while (matrix[lastY + '-' + lastX]) {
                            matrix[y + '-' + lastX] = true;
                            misBlock.width += 1;
                            lastX += 1;
                        }
                    }
                    setting.onGapFound(layoutManager.setBlock(misBlock, setting), setting);
                }
            }

        }

        runtime.matrix = matrix;
        runtime.totalRow = maxY;
        runtime.totalCol = maxX;
    }
};