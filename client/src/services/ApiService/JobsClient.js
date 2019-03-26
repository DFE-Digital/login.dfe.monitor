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
  async getPageOfJobsOfType(type, pageNumber) {
    const response = await this.client.get(`jobs/types/${type}?page=${pageNumber}`);
    // return response.data;
    return {
      numberOfPages: response.data.numberOfPages,
      numberOfJobs: response.data.numberOfJobs,
      jobs: response.data.jobs.map(job=>(Object.assign({}, job, {
        created_at: new Date(parseInt(job.created_at)),
      }))),
    };
  }
}

export default JobsClient;
