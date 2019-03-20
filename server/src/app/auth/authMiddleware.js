const config = require('./../../infrastructure/config');
const jwt = require('jsonwebtoken');
const { getPemByKid } = require('./../../infrastructure/oidc');

const getToken = (req) => {
  const authHeader = req.get('authorization');
  if (authHeader && authHeader.match(/^bearer\s/i)) {
    return authHeader.substr(7);
  }

  if (req.cookies.identity) {
    return req.cookies.identity;
  }

  return undefined;
};

const authMiddleware = (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).send();
  }

  const { url, clockTolerance, clientId } = config.identifyingParty;

  try {
    const getKey = (header, callback) => {
      getPemByKid(header.kid).then((pem) => {
        callback(null, pem);
      }).catch((err)=>{
        callback(err);
      });
    };
    const opts = {
      clockTolerance,
      audience: clientId,
      issuer: url,
    };
    jwt.verify(token, getKey, opts, (err, decoded) => {
      if (err) {
        return res.status(401).send();
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).send();
  }
};
module.exports = authMiddleware;
