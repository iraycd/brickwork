
control.destroy= function() {
    var allBlock = container.find(setting.selector).removeAttr('id'),
        block = null,
        activeBlock = [];

    allBlock.each(function(index, item) {
        $item = $(item);
        var width = 1 * $item.attr('data-width') || "";
        var height = 1 * $item.attr('data-height') || "";
        $item.width(width).height(height).css({
            position: 'static'
        });
    });
}
