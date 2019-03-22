const collector = require('./collector');
const { forEachAsync } = require('./../../utils');
const { listJobTypes, getPageOfJobs, getPageOfJobsOfType } = require('./../../infrastructure/jobs');

const timeout = 30000;

const getCounts = async (store) => {
  const correlationId = `countcollector-${Date.now()}`;

  const overallDetails = await getPageOfJobs(1, 1, true, correlationId);
  store.setJobOverallCounts(overallDetails.totals);

  const types = await listJobTypes(correlationId);
  await forEachAsync(types, async (type) => {
    const typeDetails = await getPageOfJobsOfType(type, 1, 1, true, correlationId);
    store.setJobTypeCounts({
      id: type,
      inactive: typeDetails.totals.inactive,
      active: typeDetails.totals.active,
      failed: typeDetails.totals.failed,
      completed: typeDetails.totals.completed,
    });
  });
};
module.exports = collector(getCounts, timeout);
