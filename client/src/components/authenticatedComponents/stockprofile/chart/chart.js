import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
//import { Switch, Route } from "react-router-dom";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:"https://canvasjs.com/wp-content/uploads/images/gallery/php-charts/overview/php-charts-graphs-index-data-label.png",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {}
  handleSubmit() {}
  render() {
    return <div><img src={this.state.url} alt="chart"/></div>;
  }
}

export default Chart;
