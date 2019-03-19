const config = require('./infrastructure/config');
const healthCheck = require('login.dfe.healthcheck');
const jobs = require('./app/jobs');

const registerRoutes = (app) => {
  app.use('/healthcheck', healthCheck({
    config,
  }));

  app.use('/jobs', jobs());
};

module.exports = registerRoutes;