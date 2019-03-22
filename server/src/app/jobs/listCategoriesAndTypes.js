const { store } = require('./../../data');

const listCategoriesAndTypes = async (req, res) => {
  const categories = store.getJobCategories();
  return res.json(categories);
};
module.exports = listCategoriesAndTypes;
