class JobsClient {
  constructor(client) {
    this.client = client;
  }

  async getCategoriesAndTypes() {
    const response = await this.client.get('jobs/categories');
    return response.data;
  }

  async getStats() {
    const response = await this.client.get('jobs');
    return response.data;
  }
}

export default JobsClient;