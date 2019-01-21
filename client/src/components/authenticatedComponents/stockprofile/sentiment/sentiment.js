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
    return (
      <div style={{ padding: "1vh" }}>
        Sentiments
        {Object.keys(this.props.data).map(item => {
          return (
            <div key={item}>
              {item} <SentimentBar data={this.props.data[item]} />
            </div>
          );
        })}
        <div className="container-fluid fixed-bottom" style={{fontSize:"10px"}}>Stock data obtained from iextrading. Sentiments derived using twitter and NewsAPI.</div>
      </div>
    );
  }
}

class SentimentBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let sentiment = this.props.data;
    let color = "";
    console.log(sentiment * 100);
    if (sentiment < 0) {
      color = "red";
    } else {
      color = "green";
    }
    return (
      <div
        style={{
          width: "80%",
          border: "1px solid black",
          //     borderBottom: "1px solid black",
          height: "20px"
        }}
      >
        <div
          style={{
            width: `${sentiment * 200}%`,
            background: `${color}`,
            height: "100%"
          }}
        />
      </div>
    );
  }
}

export default Sentiment;
