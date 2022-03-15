import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleArticle from "./components/SingleArticle";
import { getToken } from "./utils/storage";
import { userURL } from "./utils/constant";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Compose from "./components/Compose";
import CurrUserProfile from "./components/CurrUserProfile";
import EditArticle from './components/EditArticle';

let baseUrl = "https://mighty-oasis-08080.herokuapp.com/api/articles";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    if (localStorage.token) {
      this.fetchCurrentUser();
    }
  }

  fetchCurrentUser = () => {
    fetch(userURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ user: data.user }));
  };

  getDate = date => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(new Date(date));
  };

  setUser = userData => {
    this.setState({
      user: userData
    });
  };

  isLoggedIn = () => {
    let token = getToken();
    if (token && this.state.user) {
      return true;
    } else {
      return false;
    }
  };

  Logout = () => {
    localStorage.removeItem("token");
    this.setState({
      user: null
    });
  };

  render() {
    return (
      <>
        <Header
          isLoggedIn={this.isLoggedIn()}
          Logout={this.Logout}
          user={this.state.user}
        />
        {this.isLoggedIn() ? (
          <AuthenticatedApp
            getDate={this.getDate}
            user={this.state.user}
            isLoggedIn={this.isLoggedIn}
            setUser={this.setUser}
            followUser={this.followUser}
          />
        ) : (
          <UnauthenticatedApp
            getDate={this.getDate}
            user={this.state.user}
            isLoggedIn={this.isLoggedIn}
            setUser={this.setUser}
          />
        )}
      </>
    );
  }
}

function UnauthenticatedApp(props) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home getDate={props.getDate} user={props.user} />}
        />
        <Route
          path="/login"
          element={
            props.isLoggedIn() ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Login setUser={props.setUser} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            props.isLoggedIn() ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Register setUser={props.setUser} />
            )
          }
        />
        <Route
          path="/articles/:slug"
          element={<SingleArticle user={props.user} baseUrl={baseUrl} getDate={props.getDate} />}
        />
        <Route path='/profiles/:username' element={<Profile user={props.user} getDate={props.getDate} />} />
      </Routes>
    </>
  );
}

function AuthenticatedApp(props) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home getDate={props.getDate} user={props.user} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<CurrUserProfile user={props.user} getDate={props.getDate} />} />
        <Route path='/profiles/:username' element={<Profile user={props.user} getDate={props.getDate} />} />
        <Route
          path="/compose"
          element={<Compose user={props.user} />} />
        <Route
          path="/articles/:slug"
          element={<SingleArticle baseUrl={baseUrl} user={props.user} getDate={props.getDate} />}
        />
        <Route
          path="/articles/editor/:slug"
          element={<EditArticle baseUrl={baseUrl} user={props.user} getDate={props.getDate} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

/* 

        <Route path='*' element={<Navigate to='/' />} />
render(){
    return (
      <>
        <Header isLoggedIn={this.isLoggedIn()} Logout={this.Logout} user={this.state.user} />
        {
          this.isLoggedIn() ? <AuthenticatedApp getDate={this.getDate} user={this.state.user} isLoggedIn={this.isLoggedIn} setUser={this.setUser} /> : <UnauthenticatedApp getDate={this.getDate} user={this.state.user} isLoggedIn={this.isLoggedIn} setUser={this.setUser} />
        }
        <Routes>
          <Route path='/' element={<Home getDate={this.getDate} user={this.state.user} />}/>
            <Route path='/login' element={this.isLoggedIn() ? <Navigate to="/" replace={true} /> : <Login setUser={this.setUser} />} />
            <Route path='/signup' element={this.isLoggedIn() ? <Navigate to="/" replace={true} /> : <Register setUser={this.setUser} />} />
          <Route path='/articles/:slug' element={<SingleArticle baseUrl={baseUrl} getDate={this.getDate} />} /> 
        </Routes>
      </>
    )
  }
}

*/
