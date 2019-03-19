import React, { Component } from 'react';

class JobType extends Component {
  constructor(props){
    super(props);
    this.chartRef = React.createRef();
  }
  render() {
    return (
      <div className="job-type">
        <div className="title">{this.props.type.name}</div>
        <div className="content">
          <div className="chart">
            <canvas ref={this.chartRef} width="100" height="100"></canvas>
          </div>
          <div className="details">
            <table>
              <tr className="inactive">
                <th>Inactive</th>
                <td>{this.props.type.inactive}</td>
              </tr>
              <tr className="active">
                <th>Active</th>
                <td>{this.props.type.active}</td>
              </tr>
              <tr className="failed">
                <th>Failed</th>
                <td>{this.props.type.failed}</td>
              </tr>
              <tr className="completed">
                <th>Completed</th>
                <td>{this.props.type.completed}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.chart = new window.Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Inactive', 'Active', 'Failed', 'Completed'],
        datasets: [{
          label: this.props.type.name,
          data: [this.props.type.inactive, this.props.type.active, this.props.type.failed, this.props.type.completed],
          backgroundColor: [
            'yellowgreen',
            'violet',
            'red',
            'seagreen',
          ],
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: false,
        },
        cutoutPercentage: 50
      }
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.chart.data.datasets[0].data = [this.props.type.inactive, this.props.type.active, this.props.type.failed, this.props.type.completed];
    this.chart.update();
  }
}

export default JobType;