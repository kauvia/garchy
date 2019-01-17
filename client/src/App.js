import React, { Component } from "react";
import Home from "./components/home";
import Landing from "./components/landing";
import { Route, Switch } from "react-router-dom";
import Particles from "./particles";
import './App.css';



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

      console.log("fetching");
      fetch("/validate", {
        method: "GET",
        headers: {
          "X-Access-Token": `Bearer ${localStorage.getItem("token")}`,
          "validate-only": true
        }
      }).then(res =>
        res.json().then(res => {
          console.log(res);

          if (!res.success) {
            console.log(res);
            localStorage.clear();
          }
        })
      );
    }
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <Particles/>

        <Switch>
          <Route exact path="/login" component={Landing} />
          <Route exact path="/logout" component={Landing} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
