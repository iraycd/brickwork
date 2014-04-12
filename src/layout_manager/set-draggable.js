layoutManager.setDraggable= function(item, option) {
    var isTouch = false;
    var config = {
        startX: 0, //start clientX;
        startY: 0, 
        top: 0,
        left: 0,
        handle: null,
        onDrop: function() {},
        onDrag: function() {},
        onStart: function() {}
    };

    $(item).each(function() {
        var setting = $.extend({}, config, option);
        var handle = setting.handle || this;
        var ele = this;
        var $E = $(ele);
        var $H = $(handle);

        var posStyle = $E.css("position");
        posStyle != "absolute" && $E.css("position", "relative");
        

        function mouseDown(evt) {
            evt.stopPropagation();
            evt = evt.originalEvent;

            if (evt.touches) {
                isTouch = true;
                evt = evt.changedTouches[0];
            }

            if (evt.button != 2 && evt.which != 3) {
                setting.onStart.call(ele, evt);
                
                setting.startX = evt.clientX;
                setting.startY = evt.clientY;
                setting.top = parseInt($E.css("top")) || 0;
                setting.left = parseInt($E.css("left")) || 0;
                
                $D.bind("mouseup touchend", mouseUp);
                $D.bind("mousemove touchmove", mouseMove); 
            }

            return false;
        };
        
                
        function mouseMove(evt) {
            evt = evt.originalEvent;
            isTouch && (evt = evt.changedTouches[0]);
            
            $E.css({
                top: setting.top - (setting.startY - evt.clientY),
                left: setting.left - (setting.startX - evt.clientX)
            });
            
            setting.onDrag.call(ele, evt);
        };
        
        function mouseUp(evt) {
            evt = evt.originalEvent;
            isTouch && (evt = evt.changedTouches[0]);

            setting.onDrop.call(ele, evt);

            $D.unbind("mouseup touchend", mouseUp);
            $D.unbind("mousemove touchmove", mouseMove);
        };

        // ignore drag drop on text field;
        $E.find("iframe, form, input, textarea, .ignore-drag")
        .each(function() {
            $(this).on("touchstart mousedown", function(evt) {
                evt.stopPropagation();
            });
        });
        
        $D.unbind("mouseup touchend", mouseUp);
        $D.unbind("mousemove touchmove", mouseMove);
        $H.unbind("mousedown touchstart").bind("mousedown touchstart", mouseDown);

    });
}