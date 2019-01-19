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
      <div className="innerscreen" id="user-profile-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col">Splashscreen aka user profile</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
