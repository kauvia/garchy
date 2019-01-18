import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Navbar } from "./nav";
import Main from "./main";
import Splash from "./splash";

class AuthedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      stockData: {},
      doRedirect: false,
      currentLocation: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {}
  handleLogout() {
    this.setState({ doRedirect: true });
    localStorage.clear();
  }
  handleChange(e) {
    let target = e.target;
    if ("query" === target.name) {
      this.setState({ [target.name]: target.value });
    }
  }

  handleSearch(e) {
    fetch("/search", {
      method: "POST",
      mode: "cors",
      headers: {
        "X-Access-Token": `Bearer ${localStorage.getItem("token")}`,
        "validate-only": false,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res.json().then(res => {
        if (res.success === true) {
          console.log("successly got stock info", this.state);
          this.setState({ stockData: res.stockdata });
        }
      })
    );
    e.preventDefault();
  }

  render() {
    let stockPresent = Object.keys(this.state.stockData).length > 0;
    if (this.state.doRedirect) {
      return <Redirect to="/logout" />;
    } else {
      return (
        <div>
          <Navbar>
            {
              <form
                className="form-inline "
                onSubmit={this.handleSearch}
                onChange={this.handleChange}
              >
                <input
                  name="query"
                  className="form-control"
                  type="search"
                  placeholder="Search example:GOOG"
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
                <button
                  className="btn btn-outline-light"
                  type="button"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </form>
            }
          </Navbar>
          <div className="container-fluid">
          
            {stockPresent && <Main stock={this.state.stockData} />}
            {!stockPresent && <Splash />}
          </div>
        </div>
      );
    }
  }
}

export default AuthedContainer;
