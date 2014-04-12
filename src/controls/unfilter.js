control.unFilter= function() {
    delete runtime.filter;
    this.refresh();
    return this;
}