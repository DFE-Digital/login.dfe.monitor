import React, { Component } from 'react';
import Pagination from './../../components/Pagination';

class JobDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <h2><i className="fa fa-tasks"></i>Jobs - {JSON.stringify(this.props.match.params.type)} </h2>
        </header>
        <Pagination page={1} numberOfResultsOnPage={25} numberOfPages={100} numberOfJobs={10000}/>
      </React.Fragment>


    )
  }
}

export default JobDetails;
