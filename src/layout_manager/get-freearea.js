layoutManager.getFreeArea = function(t, l, runtime) {
    var maxY = Math.min(t + runtime.maxHoB, runtime.limitRow);
    var maxX = Math.min(l + runtime.maxWoB, runtime.limitCol);
    var minX = maxX;
    var minY = maxY;
    var matrix = runtime.matrix;
    
    // find limit zone by horizon;
    for (var y = t; y < minY; ++y) {
        for (var x = l; x < maxX; ++x) {
            if (matrix[y + '-' + x]) {
                (l < x && x < minX) && (minX = x);
            }
        }
    }
    
    // find limit zone by vertical;
    for (var y = t; y < maxY; ++y) {
        for (var x = l; x < minX; ++x) {
            if (matrix[y + '-' + x]) {
                (t < y && y < minY) && (minY = y);
            }
        }
    }

    return {
        top: t,
        left: l,
        width: minX - l,
        height: minY - t
    };

}