import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, Loadscreen } from "./nav";
import StockProfile from "./stockprofile";
import Splash from "./splash";

class AuthedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      stockData: { symbol: "" },
      doRedirect: false,
      loading: false
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
    if (!this.state.loading) {
      if (
        this.state.stockData.symbol.toLowerCase() !==
        this.state.query.toLowerCase()
      ) {
        console.log("sending request");
        this.setState({ loading: true });
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
              this.setState({ stockData: res.stockdata, loading: false });
              console.log("successly got stock info");
              console.log(this.state);
            }
          })
        );
      }
    }
    e.preventDefault();
  }

  render() {
    let stockPresent = Object.keys(this.state.stockData).length > 0; // TODO change this!!
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
            {this.state.loading ? (
              <Loadscreen />
            ) : (
              stockPresent && <StockProfile stock={this.state.stockData} />
            )}
            {!stockPresent && <Splash />}
          </div>
        </div>
      );
    }
  }
}

export default AuthedContainer;
