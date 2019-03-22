class Store {
  constructor() {
    this.jobs = {
      categories: [],
    };
  }

  setJobCategories(categories) {
    this.jobs.categories = categories;
  }

  getJobCategories() {
    return this.jobs.categories.map(c => Object.assign({}, c));
  }
}

module.exports = Store;