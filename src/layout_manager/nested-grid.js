layoutManager.nestedGrid= function(item, setting) {
    var innerWall, $item = $(item), runtime = setting.runtime;
    var gutterX = $item.attr("data-gutterX") || setting.gutterX;
    var gutterY = $item.attr("data-gutterY") || setting.gutterY;
    var method = $item.attr("data-method") || "fitZone";
    var nested = $item.attr('data-nested') || "> div";
    var cellH = $item.attr("data-cellH") || setting.cellH;
    var cellW = $item.attr("data-cellW") || setting.cellW;
    var block = runtime.blocks[item.id];
    
    if (block) {
        innerWall = new brickwork($item);
        innerWall.reset({
            cellH: cellH,
            cellW: cellW,
            gutterX: 1 * gutterX,
            gutterY: 1 * gutterY,
            selector: nested
        });

        switch (method) {
            case "fitHeight":
                innerWall[method](block.height);
                break;
            case "fitWidth":
                innerWall[method](block.width);
                break;
            case "fitZone":
                innerWall[method](block.width, block.height);
                break;
        }
    }
}