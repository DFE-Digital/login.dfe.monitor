const config = require('./../../infrastructure/config');
const { getTokens } = require('./../../infrastructure/oidc');

const processAuthCallback = async (req, res) => {
  const result = await getTokens(req.query.code);

  res.cookie('identity_details', result.id_token.split('.')[1], {
    secure: true,
    httpOnly: false,
  });
  res.cookie('identity', result.id_token, {
    secure: true,
    httpOnly: true,
  });
  res.cookie('refresh', result.refresh_token, {
    secure: true,
    httpOnly: true,
  });
  // TODO: anti-tamper

  const { clientUrl } = config.hostingEnvironment;
  return res.redirect(clientUrl);
};
module.exports = processAuthCallback;
