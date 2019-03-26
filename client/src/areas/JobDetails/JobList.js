import React, { Component } from 'react';
import moment from 'moment';

class JobList extends Component {
  render() {
    const jobs = this.props.jobs.map((job) =>
      <tr>
        <td>{job.id}</td>
        <td>{job.email || 'Unknown'}</td>
        <td>{job.state}</td>
        <td>{moment(job.createdAt).format('DD MMM YYYY')}</td>
      </tr>
    );
    return(
  <React.Fragment>
    <div className="jobList">
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>State</th>
          <th>Created at</th>
        </tr>
        </thead>
        <tbody>
        {jobs}
        </tbody>
      </table>
    </div>
  </React.Fragment>
    )
  }
}

export default JobList;
