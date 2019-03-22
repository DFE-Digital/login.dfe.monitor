const config = require('./infrastructure/config');
const healthCheck = require('login.dfe.healthcheck');
const jobs = require('./app/jobs');
const auth = require('./app/auth');

const registerRoutes = (app) => {
  app.use('/healthcheck', healthCheck({
    config,
  }));

  app.use('/auth', auth());
  app.use(auth.middleware);

  app.use('/jobs', jobs());
};

module.exports = registerRoutes;