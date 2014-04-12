
/*
add one or more blank area (hole) on layout;
example:
    
    wall.appendHoles({
        top: 10,
        left: 36,
        width: 2,
        height: 6
    });

    wall.appendHoles([
        {
            top: 16,
            left: 16,
            width: 8,
            height: 2
        },
        {
            top: 10,
            left: 36,
            width: 2,
            height: 6
        }
    ]);

*/
control.appendHoles= function(holes) {
    var newHoles = [].concat(holes), h = {}, i;
    for (i = 0; i < newHoles.length; ++i) {
        h = newHoles[i];
        runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
    }
    return this;
}
