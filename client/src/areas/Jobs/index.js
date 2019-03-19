import React, { Component } from 'react';
import JobCategory from './JobCategory';

class Jobs extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <h2><i className="fa fa-tasks"></i>Jobs</h2>
        </header>
        <div className="area-details">
          <div className="job-headlines">
            <div className="headline-status">
              <span className="status">Inactive</span>
              <span className="count">0</span>
            </div>
            <div className="headline-status">
              <span className="status">Active</span>
              <span className="count">0</span>
            </div>
            <div className="headline-status">
              <span className="status">Failed</span>
              <span className="count">0</span>
            </div>
            <div className="headline-status">
              <span className="status">Completed</span>
              <span className="count">0</span>
            </div>
          </div>
          <div className="job-types">
            <JobCategory/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jobs;