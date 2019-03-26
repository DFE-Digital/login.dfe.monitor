import React, {Component} from 'react';

class Pagination extends Component {
  handleChangePage(e, p) {
    e.preventDefault();
    this.props.setPageNumber(p)
  }

  paginationBracket(pages) {
    return pages.map((p) => {
      if (p === this.props.page) {
        return (<li><span className="current">{p}</span></li>);
      }
      return (<li><button className="button-link" onClick={(e) => this.handleChangePage(e, p)}>{p}</button></li>);
    });
  }

  paginationSeperator(previousBracket) {
    if (previousBracket.length > 0) {
      return (<li><span>...</span></li>);
    }
    return null;
  }

  render() {
    const page = this.props.page;
    const numberOfPages = this.props.numberOfPages;
    const numberOfJobs = this.props.numberOfJobs;
    const numberOfResultsOnPage = this.props.numberOfResultsOnPage;

    let lowerEndRecords = page === numberOfPages ? numberOfJobs - numberOfResultsOnPage + 1 : numberOfResultsOnPage * (page - 1) + 1;
    const upperEndRecords = lowerEndRecords + numberOfResultsOnPage - 1;

    if (numberOfJobs === 0) {
      lowerEndRecords = 0;
    }

    const pageBracketLeft = [];
    const pageBracketMiddle = [];
    const pageBracketRight = [];
    const pagesEitherSideOfCurrent = 4;

    let lowerWindowBound = page - pagesEitherSideOfCurrent;
    const upperWindowBound = page + pagesEitherSideOfCurrent;
    if (lowerWindowBound < 1) {
      lowerWindowBound = 1;
    }

    if (lowerWindowBound > 1) {
      pageBracketLeft.push(1);
    }
    for (let i = lowerWindowBound; i <= upperWindowBound && i <= numberOfPages; i++) {
      pageBracketMiddle.push(i);
    }
    if (upperWindowBound < numberOfPages) {
      pageBracketRight.push(numberOfPages);
    }

    return (
      <div className="paginate">
        <div className="showingNumber">
          <p>Showing {lowerEndRecords} - {upperEndRecords} of {numberOfJobs} rows</p>
        </div>

        <div className="pagination">
          <ul>
            {this.paginationBracket(pageBracketLeft)}
            {this.paginationSeperator(pageBracketLeft)}
            {this.paginationBracket(pageBracketMiddle)}
            {this.paginationSeperator(pageBracketRight)}
            {this.paginationBracket(pageBracketRight)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Pagination;
