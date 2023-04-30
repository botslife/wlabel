import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Navigate} from "react-router-dom";
import App from "../App";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  toCamelCase(str) {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }

  render() {
    const isExpired = AuthService.isExpired();
    if (!isExpired) {
        const decoded = AuthService.getDecodedJwt();
        return (
            <div className="container">
              <header className="jumbotron">
                <h3> Welcome home <strong> {decoded.user_name} </strong> ! </h3>{" "}
              </header>{" "}
            </div>
          );
    }else{
        //App.logout();
        return (
            <Navigate to={"/login"} />
          );
    }
    
  }
}
