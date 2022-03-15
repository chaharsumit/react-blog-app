import React from "react";
import { Navigate } from "react-router-dom";

import { composeURL } from "../utils/constant";
import { getToken } from "../utils/storage";

export default class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      success: false,
      redirectTo: null
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  createArticle = () => {
    let title = this.state.title;
    let description = this.state.description;
    let body = this.state.body;
    let tagList = this.state.tagList;
    fetch(composeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: this.state.tags
            .slice(0)
            .split(",")
            .map(tag => tag.trim())
        }
      })
    })
      .then(res => res.json())
      .then(({article}) => this.setState({...this.state, redirectTo: article.slug,success: true}));
  };

  composeArticle = event => {
    event.preventDefault();
    this.createArticle();
  };

  render() {
    return this.state.success ? (
      <Navigate to={`/articles/${this.state.redirectTo}`} replace={true} />
    ) : (
      <section className="compose flex container">
        <form onSubmit={this.composeArticle} className="form flex">
          <input
            onChange={this.handleChange}
            className="form-control"
            type="text"
            name="title"
            placeholder="Article Title"
          />
          <input
            onChange={this.handleChange}
            className="form-control"
            type="text"
            name="description"
            placeholder="What's this article about?"
          />
          <textarea
            onChange={this.handleChange}
            type="text"
            name="body"
            placeholder="Write your article(in markdown)"
            className="compose-textarea form-control"
          />
          <input
            onChange={this.handleChange}
            className="form-control"
            type="text"
            name="tags"
            placeholder="Enter Tags"
          />
          <input
            type="submit"
            value="Create Article"
            className="form-control submit-btn"
          />
        </form>
      </section>
    );
  }
}

/*
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
*/
