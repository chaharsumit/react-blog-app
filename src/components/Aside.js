import React from "react";
import Loader from "./Loader";
import { tagsURL } from "../utils/constant";
export default class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      error: '',
    };
  }

  componentDidMount() {
    fetch(tagsURL)
      .then(res => {
        if(!res.ok){
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) =>
        this.setState({
          tags
        })
      )
      .catch((err) => {
        this.setState({ error: 'Not able to fetch tags' })
      })
  }

  render() {
    if (this.state.tags) {
      return (
        <div className="tags-container">
          <h3 className="text-md tag-heading text-danger">#Popular Tags</h3>
          <ul className="tags-menu flex">
            {this.state.tags.map(tag => (
              tag ?
              (<li
                key={tag}
                onClick={this.props.handleTagSelect}
                className="tags-menu-item text-xsm"
              >
                {tag}
              </li>) 
              : ''
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="tags-container">
          <h3 className="text-md tag-heading text-danger">#Popular Tags</h3>  
          <p>Loading Tags...</p>
        </div>
      );
    }
  }
}
