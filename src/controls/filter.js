

control.filter= function(filter) {
    runtime.filter = filter;
    runtime.currentMethod && this.refresh();
    return this;
}