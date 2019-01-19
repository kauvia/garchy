import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog } from "@fortawesome/free-solid-svg-icons";


import Landing from "./components/landing";
import AuthedContainer from "./components/authenticatedComponents";
import Particles from "./particles";

import "./App.css";
library.add(faCog);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: ""
    };
  }
  componentDidMount() {
    if (localStorage.length > 0) {
      this.setState({ isLoggedIn: true });
      this.setState({ token: localStorage.getItem("token") });

      fetch("/validate", {
        method: "GET",
        headers: {
          "X-Access-Token": `Bearer ${localStorage.getItem("token")}`,
          "validate-only": true
        }
      }).then(res =>
        res.json().then(res => {
          //    console.log(res);

          if (!res.success) {
            //       console.log(res);
            localStorage.clear();
          }
        })
      );
    }
  }
  render() {
    return (
      <div>
        <Particles />

        <Switch>
          <Route exact path="/login" component={Landing} />
          <Route exact path="/logout" component={Landing} />
          <Route path="/" render={props => <AuthedContainer {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
