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
    return {
      "jobs": [
      {
        "id": 1,
        "type": "passwordreset_v1",
        "data": {
          "email": "matthew.leary@education.gov.uk",
          "code": "WVC4SRFG",
          "clientId": "support",
          "uid": "05A8B9E2-3550-4655-875D-01B017EC2555"
        },
        "priority": 0,
        "progress": "100",
        "state": "complete",
        "created_at": "1519645897842",
        "promote_at": "1519645897842",
        "updated_at": "1519663817361",
        "started_at": "1519663816689",
        "duration": "672",
        "workerId": "kue:RD0003FF74B23D:7396:passwordreset_v1:5",
        "attempts": {
          "made": 1,
          "remaining": 0,
          "max": 1
        }
      }
    ],
      "numberOfPages": 14,
      "numberOfJobs": 1385
    }
  }
}

export default JobsClient;
