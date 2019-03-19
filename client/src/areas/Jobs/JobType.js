import React, { Component } from 'react';

class JobType extends Component {
  render() {
    return (
      <div className="job-type">
        <div className="title">User updated</div>
        <div className="content">
          <div className="chart">
            <canvas id="userUpdatedChart" width="100" height="100"></canvas>
          </div>
          <div className="details">
            <table>
              <tr className="inactive">
                <th>Inactive</th>
                <td>0</td>
              </tr>
              <tr className="active">
                <th>Active</th>
                <td>0</td>
              </tr>
              <tr className="failed">
                <th>Failed</th>
                <td>0</td>
              </tr>
              <tr className="completed">
                <th>Completed</th>
                <td>0</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default JobType;