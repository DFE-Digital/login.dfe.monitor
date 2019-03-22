const { listJobTypes, getPageOfJobs, getPageOfJobsOfType } = require('./../../infrastructure/jobs');
const { mapAsync } = require('./../../utils');
const { store } = require('./../../data');

const getRandomLength = () => Math.round(Math.random() * 100);

const getJobCounts = async (req, res) => {
  const counts = store.getJobCounts();
  return res.json(counts);
  // const types = await listJobTypes(req.id);
  // const typesWithCounts = await mapAsync(types, async (type) => {
  //   const typeDetails = await getPageOfJobsOfType(type, 1, 1, true, req.id);
  //   return {
  //     id: type,
  //     inactive: typeDetails.totals.inactive,
  //     active: typeDetails.totals.active,
  //     failed: typeDetails.totals.failed,
  //     completed: typeDetails.totals.completed,
  //   };
  // });
  // const overallDetails = await getPageOfJobs(1, 1, true, req.id);
  // return res.json({
  //   totals: {
  //     inactive: overallDetails.totals.inactive,
  //     active: overallDetails.totals.active,
  //     failed: overallDetails.totals.failed,
  //     completed: overallDetails.totals.completed,
  //   },
  //   types: typesWithCounts,
  // });
};
module.exports = getJobCounts;
