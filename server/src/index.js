const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./infrastructure/logger');
const https = require('https');
const http = require('http');
const config = require('./infrastructure/config');
const helmet = require('helmet');
const registerRoutes = require('./routes');
const { getErrorHandler } = require('login.dfe.express-error-handling');
const data = require('./data');

const app = express();

https.globalAgent.maxSockets = http.globalAgent.maxSockets = config.hostingEnvironment.agentKeepAlive.maxSockets || 50;
app.use(helmet({
  noCache: true,
  frameguard: {
    action: 'deny',
  },
}));

if (config.hostingEnvironment.env !== 'dev') {
  app.set('trust proxy', 1);
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', config.hostingEnvironment.clientUrl);
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

registerRoutes(app);

// Error handing
app.use(getErrorHandler({
  logger,
}));

data.start();

if (config.hostingEnvironment.env === 'dev') {
  app.proxy = true;

  const options = {
    key: config.hostingEnvironment.sslKey,
    cert: config.hostingEnvironment.sslCert,
    requestCert: false,
    rejectUnauthorized: false,
  };
  const server = https.createServer(options, app);

  server.listen(config.hostingEnvironment.port, () => {
    logger.info(`Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
} else {
  app.listen(process.env.PORT, () => {
    logger.info(`Server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
}
