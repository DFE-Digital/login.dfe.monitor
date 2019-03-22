const collector = require('./collector');
const config = require('./../../infrastructure/config');
const { listJobTypes } = require('./../../infrastructure/jobs');

const timeout = 54000 * 1000; // 15 minutes

const getCategories = async (store) => {
  const types = await listJobTypes(`categorycollector-${Date.now()}`);
  const categories = config.categories.map((c) => {
    return Object.assign({}, c, { types: [] });
  }).concat([{ id: 'misc', name: 'misc', types: [] }]);
  types.forEach((type) => {
    const configCategory = config.categories.find(c => c.types.find(t => type.match(new RegExp(t, 'i'))));
    const categoryId = configCategory ? configCategory.id : 'misc';
    categories.find(c => c.id === categoryId).types.push({ id: type, name: type });
  });
  store.setJobCategories(categories);
};
module.exports = collector(getCategories, timeout);
