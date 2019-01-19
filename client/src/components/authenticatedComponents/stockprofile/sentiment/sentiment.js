import React, { Component } from "react";

class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
// this.props.data = {twitter}
  handleChange() {}
  handleSubmit() {}
  render() {
    let {twitter}= this.props.data
    return <div>Sentiments<div>Twitter : {twitter}</div></div>;
  }
}

export default Sentiment;
