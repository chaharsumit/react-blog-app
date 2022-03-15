import React from "react";
import { NavLink, Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activeStyle = {
      textDecoration: "underline",
      color: "rgb(228, 101, 101)",
      fontWeight: '900',
      textShadow: '0 0 0.05rem'
    };
    let nonActiveStyle = {
      textDecoration: "none",
      color: "rgb(228, 101, 101)"
    };
    let user = this.props.user;
    return (
      <header className="header">
        <div className="container flex">
          <Link to="/" style={{textDecoration: 'none'}}>
            <a className="logo text-danger">Conduit.</a>
          </Link>
          <nav className="navbar">
            <ul className="nav-menu flex">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }
              >
                <li className="nav-item">Home</li>
              </NavLink>
              {this.props.isLoggedIn && this.props.user ? (
                <>
                  <NavLink
                      to="/compose"
                      style={({ isActive }) =>
                        isActive ? activeStyle : nonActiveStyle
                      }
                    >
                      <li className="nav-item">Compose</li>
                  </NavLink>
                  <NavLink
                      to="/settings"
                      style={({ isActive }) =>
                        isActive ? activeStyle : nonActiveStyle
                      }
                    >
                      <li className="nav-item">Settings</li>
                  </NavLink>
                  <NavLink
                      to="/profile"
                      style={({ isActive }) =>
                        isActive ? activeStyle : nonActiveStyle
                      }
                    >
                      <li className="nav-item">{user.username}</li>
                  </NavLink>
                  <li onClick={this.props.Logout} className="nav-item logout-btn">
                    <Link to='/' className="text-light site-link">
                      Logout  
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <li className="nav-item">Sign in</li>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <li className="nav-item">Sign up</li>
                  </NavLink>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
