const { getAuthUrl } = require('./../../infrastructure/oidc');

const startAuth = async (req, res) => {
  const url = await getAuthUrl();
  return res.redirect(url);
};
module.exports = startAuth;
