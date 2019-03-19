import React, { Component } from 'react';
import JobType from './JobType';

class JobCategory extends Component {
  render() {
    const types = this.props.category.types.map(type => (<JobType key={type.id} type={type}/>));
    return (
      <div className="job-category">
        <h4>{this.props.category.name}</h4>
        {types}
      </div>
    );
  }
}

export default JobCategory;