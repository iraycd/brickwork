
control.appendBlock= function(items) {
    var allBlock = $(items).appendTo(container);
    var block = null;
    var activeBlock = [];
    
    allBlock.each(function(index, item) {
        item.index = ++index;
        if (block = layoutManager.loadBlock(item, setting)) {
            activeBlock.push(block);
        }
    });

    engine[setting.engine](activeBlock, setting);
    
    layoutManager.setWallSize(runtime, container);
    
    runtime.length = allBlock.length;

    allBlock.each(function(index, item) {
        layoutManager.showBlock(item, setting);
        if (setting.draggable || item.getAttribute('data-draggable')) {
            setDraggable(item,setting);
        }
    });
}