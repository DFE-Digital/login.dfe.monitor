const config = require('./../../infrastructure/config');

const signout = async (req, res) => {
  res.clearCookie('identity_details');
  res.clearCookie('identity');
  res.clearCookie('refresh');

  const { clientUrl } = config.hostingEnvironment;
  return res.redirect(clientUrl);
};
module.exports = signout;
