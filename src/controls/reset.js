
/*
custom layout setting;
example:

    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 160,
        cellH: 160,
        delay: 50,
        onResize: function() {
            wall.fitWidth();
        }
    });
*/
control.reset= function(option) {
    $.extend(setting, option);
    return this;
}
