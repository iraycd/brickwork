
layoutManager.adjustBlock= function(block, setting) {
    var runtime = setting.runtime;
    var gutterX = runtime.gutterX;
    var gutterY = runtime.gutterY;
    var $item = $("#" + block.id);
    var cellH = runtime.cellH;
    var cellW = runtime.cellW;

    if (setting.cellH == 'auto') {
        $item.width(block.width * cellW - gutterX);
        $item[0].style.height = "";
        block.height = Math.round(($item.height() + gutterY) / cellH);
    }
}