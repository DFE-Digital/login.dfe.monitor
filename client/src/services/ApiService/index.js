import JobsClient from './JobsClient';
import axios from 'axios';

class ApiService {
  constructor(apiBaseUri) {
    this.client = axios.create({
      baseURL: apiBaseUri,
      withCredentials: true,
    });
    this.client.interceptors.response.use((response) => response, (error) => {
      const statusCode = error.response ? error.response.status : 500;
      if (statusCode === 401) {
        error.apiAuthenticationRequired = true;
      }
      return Promise.reject(error);
    });

    this.jobs = new JobsClient(this.client);
  }
}

export default ApiService;