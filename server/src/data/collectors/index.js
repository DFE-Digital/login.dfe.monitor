const jobCategoryCollector = require('./jobCategoryCollector');

const start = (store) => {
  jobCategoryCollector.start(store);
};
const stop = () => {
  jobCategoryCollector.stop();
};

module.exports = {
  start,
  stop,
};
