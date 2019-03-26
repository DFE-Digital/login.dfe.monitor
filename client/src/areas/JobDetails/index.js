import React, {Component} from 'react';
import Pagination from './../../components/Pagination';
import JobList from './JobList';

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: 0,
      numberOfJobs: 0,
      jobs: [],
      currentPageNumber: 1,
    };
  }

  setPageNumber(pageNumber) {
    this.setState({
      currentPageNumber: pageNumber,
    });
  }

  loadPageOfJobs() {
    console.info(`Load page of jobs (${this.props.match.params.type}, ${this.state.currentPageNumber})`);
    this.props.apiService.jobs.getPageOfJobsOfType(this.props.match.params.type, this.state.currentPageNumber).then((mapJob) => {
      const mapJobs = mapJob.jobs.map(j => ({
        id: j.id,
        state: j.state,
        createdAt: j.created_at,
        email: j.data.email,
      }));
      this.setState({
        numberOfPages: mapJob.numberOfPages,
        numberOfJobs: mapJob.numberOfJobs,
        jobs: mapJobs,
      })
    }).catch((e) => {
      if (e.apiAuthenticationRequired) {
        this.props.authenticate();
        return;
      }
      throw e;
    })
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h2><i className="fa fa-tasks"></i>Jobs - {JSON.stringify(this.props.match.params.type)} </h2>
        </header>
        <div className="jobs-pagination">
        <Pagination page={this.state.currentPageNumber} numberOfResultsOnPage={25}
                    numberOfPages={this.state.numberOfPages}
                    numberOfJobs={this.state.numberOfJobs} setPageNumber={this.setPageNumber.bind(this)}/>
        </div>
        <div className="jobs">
          <JobList jobs={this.state.jobs}/>
        </div>
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.loadPageOfJobs();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.info(`prev: ${prevState.currentPageNumber}, current: ${this.state.currentPageNumber}`);
    if (prevState.currentPageNumber !== this.state.currentPageNumber) {
      this.loadPageOfJobs()
    }
  }

}

export default JobDetails;
