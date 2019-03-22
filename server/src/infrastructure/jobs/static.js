const listJobTypes = async (correlationId) => {
  return Promise.resolve([]);
};

const getPageOfJobs = async (pageNumber, pageSize, countsOnly, correlationId) => {
  return Promise.resolve({
    totals: {
      inactive: 0,
      active: 0,
      failed: 0,
      completed: 0,
    },
    jobs: [],
  });
};

const getPageOfJobsOfType = async (type, pageNumber, pageSize, countsOnly, correlationId) => {
  return Promise.resolve({
    totals: {
      inactive: 0,
      active: 0,
      failed: 0,
      completed: 0,
    },
    jobs: [],
  });
};

module.exports = {
  listJobTypes,
  getPageOfJobs,
  getPageOfJobsOfType,
};
