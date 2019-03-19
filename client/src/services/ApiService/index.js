import JobsClient from './JobsClient';

class ApiService {
  constructor(apiBaseUri) {
    this.baseUri = apiBaseUri;

    this.jobs = new JobsClient();
  }
}

export default ApiService;