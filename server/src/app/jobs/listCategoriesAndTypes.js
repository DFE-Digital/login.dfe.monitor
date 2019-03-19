const config = require('./../../infrastructure/config');
const { listJobTypes } = require('./../../infrastructure/jobs');

const listCategoriesAndTypes = async (req, res) => {
  const types = await listJobTypes(req.id);
  const categories = config.categories.map((c) => {
    return Object.assign({}, c, { types: [] });
  }).concat([{ id: 'misc', name: 'misc', types: [] }]);
  types.forEach((type) => {
    const configCategory = config.categories.find(c => c.types.find(t => type.match(new RegExp(t, 'i'))));
    const categoryId = configCategory ? configCategory.id : 'misc';
    categories.find(c => c.id === categoryId).types.push({ id: type, name: type });
  });
  return res.json(categories);
};
module.exports = listCategoriesAndTypes;
