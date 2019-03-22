const jobCategoryCollector = require('./jobCategoryCollector');
const jobCountCollector = require('./jobCountCollector');

const start = (store) => {
  jobCategoryCollector.start(store);
  jobCountCollector.start(store);
};
const stop = () => {
  jobCategoryCollector.stop();
  jobCountCollector.stop();
};

module.exports = {
  start,
  stop,
};
