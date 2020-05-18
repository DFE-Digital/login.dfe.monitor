const config = require('./../config');
const rp = require('login.dfe.request-promise-retry');

const jwtStrategy = require('login.dfe.jwt-strategies');

const callApi = async (endpoint, method, body, correlationId) => {
  const token = await jwtStrategy(config.jobs.service).getBearerToken();

  try {
    const response = await rp({
      method: method,
      uri: `${config.jobs.service.url}${endpoint}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: body,
      resolveWithFullResponse: true,
      json: true,
    });
    if (response.statusCode !== 200) {
      const e = new Error(response.body);
      e.statusCode = response.statusCode;
      throw e;
    }
    return response;
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 404) {
      return null;
    }
    throw e;
  }
};

const listJobTypes = async (correlationId) => {
  const response = await callApi('/jobs/types', 'GET', undefined, correlationId);
  return response.body;
};

const getPageOfJobs = async (pageNumber, pageSize, countsOnly, correlationId) => {
  try {
    const response = await callApi(`/jobs?page=${pageNumber}&pageSize=${pageSize}`, countsOnly ? 'HEAD' : 'GET', undefined, correlationId);

    const body = response.body || {};
    const inactive = parseInt(response.headers['x-count-inactive']);
    const active = parseInt(response.headers['x-count-active']);
    const failed = parseInt(response.headers['x-count-failed']);
    const completed = parseInt(response.headers['x-count-complete']);
    return {
      totals: {
        inactive: !inactive || isNaN(inactive) ? 0 : inactive,
        active: !active || isNaN(active) ? 0 : active,
        failed: !failed || isNaN(failed) ? 0 : failed,
        completed: !completed || isNaN(completed) ? 0 : completed,
      },
      jobs: body.jobs || [],
      numberOfJobs: body.numberOfJobs || 0,
      numberOfPages: body.numberOfPages || 0,
    };
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 404) {
      return null;
    }
    throw e;
  }
};

const getPageOfJobsOfType = async (type, pageNumber, pageSize, countsOnly, correlationId) => {
  try {
    const response = await callApi(`/jobs/types/${type}?page=${pageNumber}&pageSize=${pageSize}`, countsOnly ? 'HEAD' : 'GET', undefined, correlationId);

    const body = response.body || {};
    const inactive = parseInt(response.headers['x-count-inactive']);
    const active = parseInt(response.headers['x-count-active']);
    const failed = parseInt(response.headers['x-count-failed']);
    const completed = parseInt(response.headers['x-count-complete']);
    return {
      totals: {
        inactive: !inactive || isNaN(inactive) ? 0 : inactive,
        active: !active || isNaN(active) ? 0 : active,
        failed: !failed || isNaN(failed) ? 0 : failed,
        completed: !completed || isNaN(completed) ? 0 : completed,
      },
      jobs: body.jobs || [],
      numberOfJobs: body.numberOfJobs || 0,
      numberOfPages: body.numberOfPages || 0,
    };
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 404) {
      return null;
    }
    throw e;
  }
};

module.exports = {
  listJobTypes,
  getPageOfJobs,
  getPageOfJobsOfType,
};
