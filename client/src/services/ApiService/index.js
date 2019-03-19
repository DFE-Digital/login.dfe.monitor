import JobsClient from './JobsClient';
import axios from 'axios';

class ApiService {
  constructor(apiBaseUri) {
    this.client = axios.create({
      baseURL: apiBaseUri,
    });

    this.jobs = new JobsClient(this.client);
  }
}

export default ApiService;