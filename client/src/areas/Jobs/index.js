import React, { Component } from 'react';
import JobCategory from './JobCategory';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: {
        inactive: 0,
        active: 0,
        failed: 0,
        completed: 0,
      },
      categories: []
    };
  }

  pollStats() {
    const { categories } = this.state;

    this.props.apiService.jobs.getStats().then((stats) => {
      const cleanCategories = categories.map((category) => {
        const cleanCategory = Object.assign({}, category, { types: [] });
        cleanCategory.types = category.types.map((type) => {
          const cleanType = Object.assign({}, type, {
            inactive: 0,
            active: 0,
            failed: 0,
            completed: 0,
          });
          const typeStats = stats.types.find(st => st.id === type.id);
          if (typeStats) {
            cleanType.inactive = typeStats.inactive;
            cleanType.active = typeStats.active;
            cleanType.failed = typeStats.failed;
            cleanType.completed = typeStats.completed;
          }
          return cleanType;
        });
        return cleanCategory;
      });
      this.setState({
        totals: stats.totals,
        categories: cleanCategories,
      });
    }).catch((e)=>{
      if (e.apiAuthenticationRequired) {
        this.props.authenticate();
        return;
      }
      throw e;
    })
  }

  render() {
    const categories = this.state.categories.map(category => (<JobCategory key={category.id} category={category}/>));
    return (
      <React.Fragment>
        <header>
          <h2><i className="fa fa-tasks"></i>Jobs</h2>
        </header>
        <div className="area-details">
          <div className="job-headlines">
            <div className="headline-status">
              <span className="status">Inactive</span>
              <span className="count">{this.state.totals.inactive}</span>
            </div>
            <div className="headline-status">
              <span className="status">Active</span>
              <span className="count">{this.state.totals.active}</span>
            </div>
            <div className="headline-status">
              <span className="status">Failed</span>
              <span className="count">{this.state.totals.failed}</span>
            </div>
            <div className="headline-status">
              <span className="status">Completed</span>
              <span className="count">{this.state.totals.completed}</span>
            </div>
          </div>
          <div className="job-types">
            {categories}
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.props.apiService.jobs.getCategoriesAndTypes().then((categoriesAndTypes) => {
      this.setState({
        categories: categoriesAndTypes.map(c => ({
          id: c.id,
          name: c.name,
          types: c.types.map(t => ({
            id: t.id,
            name: t.name,
            inactive: 0,
            active: 0,
            failed: 0,
            completed: 0,
          })),
        })),
      });

      this.pollStats();
      this.pollTimerId = setInterval(() => this.pollStats(), 5000);
    }).catch((e) => {
      if (e.apiAuthenticationRequired) {
        this.props.authenticate();
        return;
      }
      throw e;
    })
  }

  componentWillUnmount() {
    clearInterval(this.pollTimerId);
  }
}

export default Jobs;