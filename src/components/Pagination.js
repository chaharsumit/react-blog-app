import React from 'react';

export default class Pagination extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let totalArticles = this.props.articlesCount;
    let noOfPages = Math.ceil(totalArticles / 10);
    let i = 1;
    let pageArr = [];
    while(i <= noOfPages){
      pageArr.push(i);
      i++;
    }
    return (
      <section className='pagination'>
        <div className='container flex'>
          <p onClick={() => this.props.handlePagination((this.props.activePageIndex - 1) < 1 ? 1 : this.props.activePageIndex - 1)}>Prev</p>
          <ul className='pagination-menu flex'>
            {
              pageArr.map(page => (
                <li key={page} onClick={() => this.props.handlePagination(page)} className={this.props.activePageIndex != page ? 'pagination-menu-item' : 'pagination-menu-item active-page-menu-item'}>{page}</li>
              ))
            }
          </ul>
          <p onClick={() => this.props.handlePagination((this.props.activePageIndex + 1) > noOfPages ? this.props.activePageIndex : this.props.activePageIndex + 1)}>Next</p>
        </div>
      </section>
    )
  }
}