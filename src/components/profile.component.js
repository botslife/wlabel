import React, { Component } from "react";
import { Redirect, Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import App from "../App";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      kcJwt: "",
    };
  }

  componentDidMount() {
    const tokenValid = AuthService.isExpired();
    const currentUser = undefined;
    if (tokenValid) {
      const currentUser = AuthService.getCurrentUser();
      const kcJwt = AuthService.getKcJwt();
      if (!currentUser) this.setState({ redirect: "/home" });
    }
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    // if(AuthService.isTokenExpired()==null){
    //   return React.createElement(Redirect, { to:"/login"});
    // }
    const { fullToken } = this.state;
    const isExpired = AuthService.isExpired();
    if (!isExpired) {
      this.userReady = true;
      if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />;
      }
      const { currentUser } = this.state;
      const fullToken = AuthService.getDecodedJwt();
      const decData = JSON.stringify(fullToken, null, 2);
      const epochTime = fullToken.exp;
      const date = new Date(epochTime * 1000);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();

      return (
        <div className="container">
          {this.state.userReady ? (
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>User</strong>
                  <p>{fullToken.user_name}</p>
                </h3>
                <h3>
                  <strong>Name</strong>
                  <p>{fullToken.name}</p>
                </h3>
                <h3>
                  <strong> Date & Time of token expiry </strong>
                  <p>
                    {dateString} - {timeString}
                  </p>
                </h3>
                <h3>
                  <strong>Full token</strong>
                  <pre>{decData}</pre>
                </h3>
              </header>
            </div>
          ) : null}
        </div>
      );
    } else {
      //App.logout();
      return (
        <Navigate to={"/home"} />
      );
    }
  }
}
