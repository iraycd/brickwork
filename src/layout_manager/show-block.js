layoutManager.showBlock= function(item, setting) {
    var runtime = setting.runtime;
    var method = setting.animate && !this.transition ? 'animate' : 'css';
    var block = runtime.blocks[item.id];
    var $item = $(item);
    var self = this;
    var start = $item.attr("data-state") != "move";
    var trans = start ? "width 0.5s, height 0.5s" : "top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";
    
    item.delay && clearTimeout(item.delay);
    //ignore dragging block;
    if ($item.hasClass('fw-float')) return;
    
    // kill the old transition;
    self.setTransition(item, "");
    item.style.position = "absolute";
    setting.onBlockActive.call(item, block, setting);
    
    function action() {
        // start to arrange;
        start && $item.attr("data-state", "start");
        // add animation by using css3 transition;
        if (setting.animate && self.transition) {
            self.setTransition(item, trans);
        }

        // for hidden block;
        if (!block) {
            //var position = $item.position(); <= make speed so slow;
            var height = parseInt(item.style.height) || 0;
            var width = parseInt(item.style.width) || 0;
            var left = parseInt(item.style.left) || 0;
            var top = parseInt(item.style.top) || 0;
            $item[method]({
                left: left + width / 2,
                top: top + height / 2,
                width: 0,
                height: 0,
                opacity: 0
            });
        } else {
            if (block.fixSize) {
                block.height = 1 * $item.attr("data-height");
                block.width = 1 * $item.attr("data-width");
            }

            $item["css"]({
                opacity: 1,
                width: block.width,
                height: block.height
            });

            // for animating by javascript;
            $item[method]({
                top: block.top,
                left: block.left
            });

            if ($item.attr('data-nested') != null) {
                self.nestedGrid(item, setting);
            }
        }

        runtime.length -= 1;

        setting.onBlockFinish.call(item, block, setting);

        runtime.length == 0 && setting.onComplete.call(item, block, setting);
    }

    setting.delay > 0 ? (item.delay = setTimeout(action, setting.delay * $item.attr("data-delay"))) : action(); 
}