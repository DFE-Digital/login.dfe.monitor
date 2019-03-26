const { getQueryIntValue } = require('./../../utils');
const { getPageOfJobsOfType } = require('./../../infrastructure/jobs');

const listJobsOfType = async (req, res) => {
  try {
    const pageNumber = getQueryIntValue(req, 'page', 1);
    const pageSize = getQueryIntValue(req, 'pageSize', 25);
    const { typeId } = req.params;

    const page = await getPageOfJobsOfType(typeId, pageNumber, pageSize, false, req.id);
    return res.json(page);
  } catch (e) {
    if (e.isBadRequest) {
      return res.status(400).json({
        reasons: [e.message],
      });
    }
    throw e;
  }
};
module.exports = listJobsOfType;