import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
//import { Switch, Route } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    console.log("logging out");
    localStorage.clear();
    this.setState({ isLoggedIn: false });
  }
  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/logout" />;
    } else {
      return (
        <header>
          <Link
            to={{
              pathname: `/`
            }}
            className="btn btn-primary"
          >
            Home
          </Link>
          <Link
            onClick={this.handleLogout}
            to={{
              pathname: `/logout`
            }}
            className="btn btn-primary"
          >
            Logout
          </Link>
        </header>
      );
    }
  }
}

export default Header;
