import React, { Component } from "react";
import ChartCanvas from "./chartcanvas";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//this.props.data = chartURL
  handleChange() {}
  handleSubmit() {
    
  }  
  render() {
    console.log(this.props)
    return <div><ChartCanvas data={this.props.data}/></div>;
  }
}

export default Chart;
