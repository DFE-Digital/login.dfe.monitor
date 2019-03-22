class Store {
  constructor() {
    this.jobs = {
      categories: [],
      typeCounts: [],
      overallCounts: {
        inactive: 0,
        active: 0,
        failed: 0,
        completed: 0,
      },
    };
  }

  setJobCategories(categories) {
    this.jobs.categories = categories;
  }

  getJobCategories() {
    return this.jobs.categories.map(c => Object.assign({}, c));
  }


  setJobTypeCounts(typeCounts) {
    console.info(`Set counts for type ${typeCounts.id}`);
    const existing = this.jobs.typeCounts.find(t => t.id === typeCounts.id);
    if (existing) {
      Object.assign(existing, typeCounts);
    } else {
      this.jobs.typeCounts.push(typeCounts);
    }
  }

  setJobOverallCounts(counts) {
    console.info('set overall counts');
    this.jobs.overallCounts = counts;
  }

  getJobCounts() {
    return {
      totals: Object.assign({}, this.jobs.overallCounts),
      types: this.jobs.typeCounts.map(t => Object.assign({}, t)),
    };
  }
}

module.exports = Store;