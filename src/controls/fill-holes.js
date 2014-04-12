
control.fillHoles= function(holes) {
    if (arguments.length == 0) {
        runtime.holes = {};
    } else {
        var newHoles = [].concat(holes), h = {}, i;
        for (i = 0; i < newHoles.length; ++i) {
            h = newHoles[i];
            runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = null;
        }
    }
    return this;
}