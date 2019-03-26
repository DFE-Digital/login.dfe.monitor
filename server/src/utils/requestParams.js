const getQueryValue = (req, name) => {
  const key = Object.keys(req.query || {}).find(k => k.toLowerCase() === name.toLowerCase());
  if (!key) {
    return undefined;
  }
  return req.query[key];
};

const getQueryIntValue = (req, name, defaultValue = undefined) => {
  const value = getQueryValue(req, name);
  if (!value) {
    return defaultValue;
  }

  const int = parseInt(value);
  if (isNaN(int)) {
    const err = new Error(`${value} is not a valid int`);
    err.isBadRequest = true;
    throw err;
  }
  return int;
};

module.exports = {
  getQueryValue,
  getQueryIntValue,
};
