const mapAsync = async (col, iteratee) => {
  const result = new Array(col.length);
  for (let i = 0; i < col.length; i += 1) {
    result[i] = await iteratee(col[i], i);
  }
  return result;
};
const forEachAsync = async (col, iteratee) => {
  await mapAsync(col, iteratee);
};
module.exports = {
  mapAsync,
  forEachAsync,
};
