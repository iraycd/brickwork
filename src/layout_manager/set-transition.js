layoutManager.setTransition= function(item, trans) {
    var style = item.style;
    var $item = $(item);
        
    // remove animation;
    if (!this.transition && $item.stop) {
        $item.stop();
    } else if (style.webkitTransition != null) {
        style.webkitTransition = trans;
    } else if (style.MozTransition != null) {
        style.MozTransition = trans;
    } else if (style.msTransition != null) {
        style.msTransition = trans;
    } else if (style.OTransition != null) {
        style.OTransition = trans;
    } else {
        style.transition = trans;
    }
}