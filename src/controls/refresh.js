
control.refresh= function() {
    var params = arguments.length ? arguments : runtime.currentArguments;
    runtime.currentMethod == null && (runtime.currentMethod = this.fitWidth);
    runtime.currentMethod.apply(this, Array.prototype.slice.call(params, 0));
    return this;
}
