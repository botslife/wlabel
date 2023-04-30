import React, { useEffect } from "react";
import { withRouter } from "./with-router";
/*
  TODO: RD: This is unused but would be good to use this for automatically logging out user after the token expiry
*/

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kcJwt"));

    if (user) {
      const decodedJwt = parseJwt(user);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);
