setDraggable = function(item,setting) {
    var runtime = setting.runtime
    var gutterX = runtime.gutterX;
    var gutterY = runtime.gutterY;
    var cellH = runtime.cellH;
    var cellW = runtime.cellW;
    var $item = $(item);
    var handle = $item.find($item.attr("data-handle"));
    layoutManager.setDraggable(item, {
        handle: handle[0],
        onStart: function(event) {
            if (setting.animate && layoutManager.transition) {
                layoutManager.setTransition(this, "");
            }
            $item.css('z-index', 9999).addClass('fw-float');
        },
        onDrag: function(evt, tracker) {
            var position = $item.position();
            var top = Math.round(position.top / cellH);
            var left = Math.round(position.left / cellW);
            var width = Math.round($item.width() / cellW);
            var height = Math.round($item.height() / cellH);
            top = Math.min(Math.max(0, top), runtime.limitRow - height);
            left = Math.min(Math.max(0, left), runtime.limitCol - width);
            control.setHoles({top: top, left: left, width: width, height: height});
            control.refresh();
        },
        onDrop: function() {
            var position = $item.position();
            var top = Math.round(position.top / cellH);
            var left = Math.round(position.left / cellW);
            var width = Math.round($item.width() / cellW);
            var height = Math.round($item.height() / cellH);
            top = Math.min(Math.max(0, top), runtime.limitRow - height);
            left = Math.min(Math.max(0, left), runtime.limitCol - width);

            $item.removeClass('fw-float');
            $item.css({
                zIndex: "auto",
                top: top * cellH,
                left: left * cellW
            });
            
            //check old drag element;
            var x, y, key, oldDropId;
            for (y = 0; y < height; ++y) {
                for (x = 0; x < width; ++x) {
                    key = (y + top) + "-" + (x + left);
                    oldDropId = runtime.matrix[key];
                    if (oldDropId && oldDropId != true) {
                        $("#" + oldDropId).removeAttr("data-position");
                    }
                }
            }
            
            runtime.holes = {};
            
            $item.attr({
                "data-width": $item.width(),
                "data-height": $item.height(),
                "data-position": top + "-" + left
            });

            control.refresh();
        }
    });
};