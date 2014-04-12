layoutManager.resetGrid= function(runtime) {
    runtime.blocks = {};
    runtime.length = 0;
    runtime.cellH = 0;
    runtime.cellW = 0;
    runtime.lastId = 1;
    runtime.matrix = {};
    runtime.totalCol = 0;
    runtime.totalRow = 0;
}