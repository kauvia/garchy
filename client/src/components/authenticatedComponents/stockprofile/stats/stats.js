import React, { Component } from "react";
import Financials from "./financials";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFinancials: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // this.props.data = {CEO,companyName,description,exchange,financials[],sector,tags[],website}
  handleChange() {
    if (this.state.toggleFinancials) {
      this.setState({ toggleFinancials: false });
    } else {
      this.setState({ toggleFinancials: true });
    }
  }
  handleSubmit() {}
  render() {
    let { CEO, description, financials, sector } = this.props.data;
    return (
      <div>
        {this.state.toggleFinancials ? (
          <div onClick={this.handleChange}>
            <Financials data={financials} />
          </div>
        ) : (
          <div onClick={this.handleChange}>
            <div>Company Profile</div>
            <div>CEO:{CEO}</div>
            <div>Sector:{sector}</div>
            <div>Description:{description}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Stats;
