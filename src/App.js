import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Country from "./components/country.component";
import NotFound from "./components/notfound.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showLoggedInMenu : false,
      currentUser: undefined,
      decodedUser : undefined,
    };
  }

  component

  componentDidMount() {
    const isExpired = AuthService.isExpired();
    if (!isExpired) {
      const user = AuthService.getCurrentUser();
      const deco  = AuthService.getDecodedJwt();
      this.setState({
        showLoggedInMenu: true,
        currentUser: user,
        decodedUser: deco,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showLoggedInMenu: false,
      currentUser: undefined,
      decodedUser : undefined,
    });
  }

  render() {
    const { currentUser,decodedUser, showLoggedInMenu } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            wLabel
          </Link>
          <div className="navbar-nav mr-auto">
            {showLoggedInMenu && (
              <li className="navbar-nav mr-auto">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              
            )}
            {showLoggedInMenu && (
              <li className="nav-item">
                <Link to={"/country"} className="nav-link">
                  Country{" "}
                </Link>{" "}
              </li>
            )}
          </div>
          {showLoggedInMenu  && decodedUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {decodedUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Signout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Signin
                </Link>
              </li>
            </div>
          )}{" "}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/home" element={<Home />} />{" "}
            <Route path="/country" element={<Country />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/profile" element={<Profile />} />{" "}
            <Route path="/*" element={<NotFound />} />{" "}
          </Routes>{" "}
        </div>
        {/*<AuthVerify logOut={this.logOut}/>*/}{" "}
      </div>
    );
  }
}

export default App;
