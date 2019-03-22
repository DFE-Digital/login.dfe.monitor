const Store = require('./Store');
const collectors = require('./collectors');

const store = new Store();

const start = () => {
  collectors.start(store);
};
const stop = () => {
  collectors.stop();
};

module.exports = {
  start,
  stop,
  store,
};
