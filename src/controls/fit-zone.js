control.fitZone= function(width, height) {
    var allBlock = container.find(setting.selector).removeAttr('id'),
        block = null,
        activeBlock = [];

    height = height ? height : container.height() || $W.height();
    width = width ? width : container.width() || $W.width();
    
    runtime.currentMethod = arguments.callee;
    runtime.currentArguments = arguments;
    
    layoutManager.resetGrid(runtime);
    layoutManager.adjustUnit(width, height, setting);

    if (runtime.filter) {
        allBlock.data('active', 0);
        allBlock.filter(runtime.filter).data('active', 1);
    } else {
        allBlock.data('active', 1);
    }
    
    allBlock.each(function(index, item) {
        var $item = $(item);
        item.index = ++index;
        if (block = layoutManager.loadBlock(item, setting)) {
            $item.data("active") && activeBlock.push(block);
        }
    });

    control.fireEvent('onGridReady', container, setting);

    engine[setting.engine](activeBlock, setting);
    
    layoutManager.setWallSize(runtime, container);
    
    control.fireEvent('onGridArrange', container, setting);

    runtime.length = allBlock.length;
   
    allBlock.each(function(index, item) {
        layoutManager.showBlock(item, setting);
        if (setting.draggable || item.getAttribute('data-draggable')) {
            setDraggable(item,setting);
        }
    });
}