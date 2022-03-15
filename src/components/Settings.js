import React from "react";
import { updateUserURL } from "../utils/constant";
import { getToken } from "../utils/storage";
import { Navigate } from "react-router-dom";
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      },
      success: false,
    };
  }

  updateUser = () => {
    let email = this.state.email;
    let password = this.state.password;
    let username = this.state.username;
    let bio = this.state.bio;
    let image = this.state.image;
    fetch(updateUserURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          username,
          bio,
          image,
        }
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(data => {
        window.location.assign('/');
        this.props.setUser(data.user);
      })
      .catch(errors => this.setState({ errors }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateUser();
  };

  validatePassword = value => {
    let hasNum = false,
      hasString = false;
    if (!value) {
      return `This field can't be empty`;
    } else if (value.length < 6) {
      return "Password must be more than 6 characters";
    } else {
      let valArr = value.split("");
      valArr.forEach(val => {
        if (!Boolean(Number(val))) {
          hasString = true;
        }
        if (Boolean(Number(val))) {
          hasNum = true;
        }
      });
    }
    return hasNum && hasString
      ? ""
      : "Password must contain both strings and numbers";
  };

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };

    switch (name) {
      case "email":
        errors.email =
          value.indexOf("@") === -1 ? "Include @ in your email" : "";
        break;
      case "password":
        errors.password = this.validatePassword(value);
      case "username":
        errors.username =
          value.length < 6 ? "Username should have more than 6 characters" : "";
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors: errors
    });
  };

  render() {
    return(
      <section className="form-container flex container">
        <h1 className="text-lg">Your Settings</h1>
        <form className="form flex" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.image}
            type="text"
            name="image"
            placeholder="Enter image Url"
            className="form-control"
          />
          <input
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            name="username"
            placeholder="Enter username"
            className="form-control"
          />
          <textarea
            onChange={this.handleChange}
            value={this.state.bio}
            type="text"
            name="bio"
            className="compose-textarea form-control"
            placeholder="Short bio about you"
          />
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
          />
          {this.state.errors.email ? (
            <span className="error-message text-danger">
              * {this.state.errors.email}
            </span>
          ) : (
            ""
          )}
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="New Password"
            className="form-control"
          />
          {this.state.errors.password ? (
            <span className="error-message text-danger">
              * {this.state.errors.password}
            </span>
          ) : (
            ""
          )}
          <input
            type="submit"
            value="Update Settings"
            className="form-control submit-btn"
          />
        </form>
      </section>
    );
  }
}