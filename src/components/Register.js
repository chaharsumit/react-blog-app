import React from "react";
import { Link } from "react-router-dom";
import { registerURL } from "../utils/constant";
import { setToken } from "../utils/storage";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      errors: {
        email: "",
        password: ""
      }
    };
  }

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

  RegisterUser = () => {
    let email = this.state.email;
    let password = this.state.password;
    let username = this.state.username;
    fetch(registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          username
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
        setToken(data.user.token);
        this.props.setUser(data.user);
      })
      .catch(errors => this.setState({ errors }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.RegisterUser();
  };

  render() {
    return (
      <section className="form-container flex container">
        <h1 className="text-lg">Sign up</h1>
        <Link to="/login">Have an account?</Link>
        <form className="form flex" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
            name="username"
            placeholder="Your Name"
            className="form-control"
          />
          {this.state.errors.username ? (
            <span className="error-message text-danger">
              * {this.state.errors.username}
            </span>
          ) : (
            ""
          )}
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
            placeholder="Password"
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
            value="Sign up"
            className="form-control submit-btn"
          />
        </form>
      </section>
    );
  }
}
