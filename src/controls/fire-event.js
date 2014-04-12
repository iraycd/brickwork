

control.fireEvent= function(name, object, setting) {
    var events = runtime.events;
    name = name.toLowerCase();
    if (events[name] && events[name].length) {
        for (var i = 0; i < events[name].length; ++i) {
            events[name][i].call(this, object, setting);
        }
    }
    return this;
}