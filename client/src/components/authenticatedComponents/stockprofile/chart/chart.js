import React, { Component } from "react";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//this.props.data = chartURL
  handleChange() {}
  handleSubmit() {}
  render() {
    return <div><img src={this.props.data} alt="chart" style={{width:'100%'}}/></div>;
  }
}

export default Chart;
