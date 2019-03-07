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
      loading: false,
      splash: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    let lastVisitedStock = localStorage.getItem("symbol");
    if (lastVisitedStock) {
      this.setState({ query: lastVisitedStock });
 //     console.log(this.state,lastVisitedStock)
      fetch("http://localhost:3011/search", {
        method: "POST",
        mode: "cors",
        headers: {
          "X-Access-Token": `Bearer ${localStorage.getItem("token")}`,
          "validate-only": false,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({query:lastVisitedStock})
      }).then(res =>
        res.json().then(res => {
          if (res.success === true) {
            this.setState({
              stockData: res.stockdata,
              loading: false,
              splash: false
            });
            localStorage.setItem("symbol", res.stockdata.symbol);
            //         console.log("successly got stock info");
            //          console.log(this.state);
          }
        })
      );
    }
  }
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
        fetch("http://localhost:3011/search", {
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
              this.setState({
                stockData: res.stockdata,
                loading: false,
                splash: false
              });
              localStorage.setItem("symbol", res.stockdata.symbol);
              //         console.log("successly got stock info");
              //          console.log(this.state);
            }
          })
        );
      }
    }
    if (e) {
      e.preventDefault();
    }
  }

  render() {
    let { doRedirect, splash } = this.state;
    if (doRedirect) {
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
                <div className="input-group">
                  <input
                    name="query"
                    className="form-control"
                    type="search"
                    placeholder="Search example 'GOOG'"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-light" type="submit">
                      Search
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </form>
            }
          </Navbar>
          <div className="container-fluid">
            {this.state.loading ? (
              <Loadscreen />
            ) : (
              !splash && <StockProfile stock={this.state.stockData} />
            )}
            {splash && <Splash />}
          </div>
        </div>
      );
    }
  }
}

export default AuthedContainer;
