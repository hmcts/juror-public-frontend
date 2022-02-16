module.exports = function steps() {
  this.Then(/^debug$/, function () {
    debugger;
  });
};
