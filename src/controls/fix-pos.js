

/*
set block with special position, the top and left are multiple of unit width/height;
example:

    wall.fixPos({
        top: 0,
        left: 0,
        block: $('.brick')
    });
*/
control.fixPos= function(option) {
    $(option.block).attr({'data-position': option.top + "-" + option.left});
    return this;
}
