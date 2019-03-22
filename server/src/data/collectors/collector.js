const collector = (loader, timeout) => {
  return {
    start: function (store) {
      loader(store);
      this.timerId = setInterval(() => {
        loader(store);
      }, timeout);
    },
    stop: function () {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
    },
  };
};
module.exports = collector;
