import React from "react";
import Hero from "./Hero";
import Articles from "./Articles";
import Aside from "./Aside";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { articlesURL } from "../utils/constant";
import { getToken } from "../utils/storage";
import { ROOT_URL } from "../utils/constant";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: "",
      offset: 0,
      articles: null,
      articlesCount: 0,
      activePageIndex: 1,
      error: '',
      activeFeed: 'user'
    };
  }

  componentDidMount() {
    this.generateUrlAndFetch();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.selectedTag !== this.state.selectedTag || prevState.activeFeed !== this.state.activeFeed
    ) {
      this.generateUrlAndFetch();
    }
  }

  generateUrlAndFetch = () => {
    let limit = 10;
    let offset = (this.state.activePageIndex - 1) * 10;
    let tag = this.state.selectedTag;
    if(this.props.user && this.state.activeFeed === 'user'){
      fetch(articlesURL + '/feed', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${getToken()}`
        }
      })
        .then(res => res.json())
        .then(({articlesCount, articles})=> this.setState({ articles: articles, articlesCount: articlesCount }));
    }else{
      fetch(
        articlesURL + `/?limit=${limit}&offset=${offset}` + (tag && `&tag=${tag}`)
      )
        .then(res => {
          if(!res.ok){
            throw new Error(res.statusText);
          }
          return res.json()
        })
        .then(({ articlesCount, articles }) =>
          this.setState({
            articles: articles,
            articlesCount: articlesCount
          })
        ).catch((err) => {
          this.setState({error: 'Not Able to fetch articles'})
        })
    }
  };

  handleTagSelect = ({ target }) => {
    let value = target.innerText;
    if (value === this.state.selectedTag) {
      return null;
    } else {
      this.setState({
        activeFeed: null,
        selectedTag: value,
        activePageIndex: 1
      });
    }
  };

  clearTag = ({ target }) => {
    this.setState({
      selectedTag: "",
      activePageIndex: 1
    });
  };

  clearTagAndFeed = ({target}) => {
    let val = target.id;
    this.setState({
      selectedTag: "",
      activePageIndex: 1,
      activeFeed: val
    })
  }

  handlePagination = (page) => {
    this.setState({
      activePageIndex: page
    });
  };

  render() {
    if (!this.state.articles) {
      return (
        <>
          <Hero />
          <div className="main-wrapper container flex">
            <Loader />
          </div>
        </>
      );
    } else {
      return (
        <>
          <Hero />
          <div className="main-wrapper container flex">
            <Articles
              addToFavourites={this.addToFavourites}
              articles={this.state.articles}
              clearTag={this.clearTag}
              selectedTag={this.state.selectedTag}
              filteredArticles={this.state.filteredArticles}
              getDate={this.props.getDate}
              user={this.props.user}
              clearTagAndFeed={this.clearTagAndFeed}
              activeFeed={this.state.activeFeed}
            />
            <Aside handleTagSelect={this.handleTagSelect} />
          </div>
          {
            !this.state.articles || this.state.articles.length === 0 ? '' : (
              <Pagination
                articlesCount={this.state.articlesCount}
                handlePagination={this.handlePagination}
                activePageIndex={this.state.activePageIndex}
              />
            )
          }
        </>
      );
    }
  }
}