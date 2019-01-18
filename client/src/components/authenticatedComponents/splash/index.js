import React, { Component } from "react";
//import Header from "./header";

class Splash extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  handleChange(e) {
    let target = e.target;
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">Splash</div>
        </div>
      </div>
    );
  }
}

export default Splash;
