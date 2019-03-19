import React, { Component } from 'react';
import JobType from './JobType';

class JobCategory extends Component {
  render() {
    return (
      <div className="job-category">
        <h4>Notifications</h4>
        <JobType/>
      </div>
    );
  }
}

export default JobCategory;