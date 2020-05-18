const config = require('./../config');
const getPem = require('rsa-pem-from-mod-exp');
const rp = require('login.dfe.request-promise-retry');

let jwksUri;
let keys = [];

const loadJkwsUri = async () => {
  const openIdConfig = await rp({
    method: 'GET',
    uri: `${config.identifyingParty.url}/.well-known/openid-configuration`,
    json: true,
  });
  jwksUri = openIdConfig.jwks_uri;
};
const loadKeys = async () => {
  if (!jwksUri) {
    await loadJkwsUri();
  }

  const jwks = await rp({
    method: 'GET',
    uri: jwksUri,
    json: true,
  });
  keys = jwks.keys;
};

const getAuthUrl = async () => {
  const { url, clientId } = config.identifyingParty;
  const { protocol, host, port } = config.hostingEnvironment;
  return `${url}/auth?client_id=${clientId}&redirect_uri=${protocol}://${host}:${port}/auth/cb&scope=openid+profile+offline_access&response_type=code&prompt=consent`;
};
const getTokens = async (code) => {
  const { url, clientId, clientSecret } = config.identifyingParty;
  const { protocol, host, port } = config.hostingEnvironment;

  const result = await rp({
    method: 'POST',
    uri: `${url}/token`,
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${protocol}://${host}:${port}/auth/cb`,
    },
    auth: {
      user: clientId,
      pass: clientSecret,
    },
    json: true,
  });
  return result;
};
const getPemByKid = async (kid) => {
  let key = keys.find(k => k.kid === kid);
  if (!key) {
    await loadKeys();
    key = keys.find(k => k.kid === kid);
  }

  if (!key) {
    throw new Error(`Cannot find key with kid ${kid}`);
  }
  return getPem(key.n, key.e);
};

module.exports = {
  getAuthUrl,
  getTokens,
  getPemByKid,
};
