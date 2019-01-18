import React, { Component } from "react";
//import Header from "./header";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  handleChange(e) {
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="row">
          <div className="col">{this.props.stock.name}</div>
        </div>
      </div>
    );
  }
}

export default Main;
