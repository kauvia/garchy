import React, { Component } from "react";

class Financials extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // this.props.data = {CEO,companyName,description,exchange,financials[],sector,tags[],website}
  handleChange() {}
  handleSubmit() {}
  render() {
    let data = this.props.data[0];

    return (
      <div><h5>Financials</h5>
        {Object.keys(data).map(item => {
          if (data[item]) {
            return (
              <div key={item}>
                {item} : {data[item]}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Financials;
