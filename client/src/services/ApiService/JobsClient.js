class JobsClient {
  constructor(client) {
    this.client = client;
  }

  async getCategoriesAndTypes() {
    const response = await this.client.get('jobs/categories');
    return response.data;
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