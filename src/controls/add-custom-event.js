control.addCustomEvent= function(name, func) {
    var events = runtime.events;
    name = name.toLowerCase();
    !events[name] && (events[name] = []);
    func.eid = events[name].length;
    events[name].push(func);
    return this;
}
