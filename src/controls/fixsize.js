
/*
set block with special size, the width and height are multiple of unit width/height;
example:

    wall.fixSize({
        height: 5,
        width: 2,
        block: $('.brick')
    });
*/
control.fixSize= function(option) {
    option.width != null && $(option.block).attr({'data-width': option.width});
    option.height != null && $(option.block).attr({'data-height': option.height});
    return this;
}
