import React, { Component } from "react";
import Landing from "../landing";
import Header from "./header";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (localStorage.length > 0) {

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
    } else {
      this.setState({ isLoggedIn: false });
    }
  }
  handleChange(e) {
    let target = e.target;
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  getStocks() {}
  render() {
    console.log(this.state);
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="container-fluid">
          <Header />
          <div className="row">
            <div className="col">Garchy</div>
          </div>
          <div className="row">
            <div className="col">Stocks</div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
