
/*
create one or more blank area (hole) on layout;
example:
    
    wall.setHoles({
        top: 2,
        left: 2,
        width: 2,
        height: 2
    });
*/

control.setHoles= function(holes) {
    var newHoles = [].concat(holes), h = {}, i;
    runtime.holes = {};
    for (i = 0; i < newHoles.length; ++i) {
        h = newHoles[i];
        runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
    }
    return this;
}