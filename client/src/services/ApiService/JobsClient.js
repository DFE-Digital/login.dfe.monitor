class JobsClient {
  async getCategoriesAndTypes() {
    return Promise.resolve([
      {
        id: 'category1',
        name: 'Category One',
        types: [
          {
            id: 'c1ja',
            name: 'Job 1A',
          },
        ]
      },
      {
        id: 'category2',
        name: 'Category Two',
        types: [
          {
            id: 'c2ja',
            name: 'Job 2A',
          },
          {
            id: 'c2jb',
            name: 'Job 2B',
          },
        ]
      },
    ]);
  }
  async getStats() {
    const getRandomLength = () => Math.round(Math.random() * 5000);
    return Promise.resolve({
      totals: {
        inactive: getRandomLength(),
        active: getRandomLength(),
        failed: getRandomLength(),
        completed: getRandomLength(),
      },
      types: [
        {
          id: 'c1ja',
          inactive: getRandomLength(),
          active: getRandomLength(),
          failed: getRandomLength(),
          completed: getRandomLength(),
        },
        {
          id: 'c2ja',
          inactive: getRandomLength(),
          active: getRandomLength(),
          failed: getRandomLength(),
          completed: getRandomLength(),
        },
        {
          id: 'c2jb',
          inactive: getRandomLength(),
          active: getRandomLength(),
          failed: getRandomLength(),
          completed: getRandomLength(),
        },
      ],
    });
  }
}

export default JobsClient;