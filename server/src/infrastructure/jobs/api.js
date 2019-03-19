const config = require('./../config');
const KeepAliveAgent = require('agentkeepalive').HttpsAgent;

const rp = require('login.dfe.request-promise-retry').defaults({
  agent: new KeepAliveAgent({
    maxSockets: config.hostingEnvironment.agentKeepAlive.maxSockets,
    maxFreeSockets: config.hostingEnvironment.agentKeepAlive.maxFreeSockets,
    timeout: config.hostingEnvironment.agentKeepAlive.timeout,
    keepAliveTimeout: config.hostingEnvironment.agentKeepAlive.keepAliveTimeout,
  }),
});

const jwtStrategy = require('login.dfe.jwt-strategies');

const callApi = async (endpoint, method, body, correlationId) => {
  const token = await jwtStrategy(config.jobs.service).getBearerToken();

  try {
    return await rp({
      method: method,
      uri: `${config.jobs.service.url}${endpoint}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: body,
      json: true,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 404) {
      return null;
    }
    throw e;
  }
};

const listJobTypes = async (correlationId) => {
  return callApi('/jobs/types', 'GET', undefined, correlationId);
};

module.exports = {
  listJobTypes,
};
