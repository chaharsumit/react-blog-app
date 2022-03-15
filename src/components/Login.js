import React from "react";
import { Link } from "react-router-dom";
import { LoginURL } from "../utils/constant";
import { setToken } from "../utils/storage";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors: errors
    });
  };

  LoginUser = () => {
    let email = this.state.email;
    let password = this.state.password;
    fetch(LoginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(({errors}) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(data => {
        setToken(data.user.token);
        this.props.setUser(data.user);
      })
      .catch(errors => this.setState(prevState => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            email: 'Email or Password is Incorrect'
          }
        }
      }));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.LoginUser();
  };

  render() {
    return (
      <section className="form-container flex container">
        <h1 className="text-lg">Sign in</h1>
        <Link to="/signup">Need an account?</Link>
        <form className="form flex" onSubmit={this.handleSubmit}>
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
            value="Sign in"
            className="form-control submit-btn"
          />
        </form>
      </section>
    );
  }
}