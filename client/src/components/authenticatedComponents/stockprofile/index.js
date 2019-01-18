import React, { Component } from "react";
//import Header from "./header";
import { Chart } from "./chart/";
import { Redirect } from "react-router-dom";

class StockProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props.location)
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
    return (
      <div>
        <div className="row">
          <div className="col">Stockpage</div>
        </div>
      </div>
    );
  }
}

export default StockProfile;
