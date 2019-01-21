import React, { Component } from "react";

import { Chart } from "./chart";
import { Sentiment } from "./sentiment";
import { Stats } from "./stats";

class StockProfile extends Component {
  constructor(props) {
    super(props);

 //   this.handleChange = this.handleChange.bind(this);
 //   this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWatchedButton =this.handleWatchedButton.bind(this)
  }
  componentDidMount() {}
  handleWatchedButton(){
    console.log('adding to favs')
  }
  render() {
    //   console.log(this.props);
    return (
      <div className="innerscreen" id="stock-profile-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h3 className="d-inline-block text-left">
                <a href={this.props.stock.website}>
                  {this.props.stock.companyName}
                </a>
              </h3>
              <div className="d-inline-block">
                <button
                  className="btn btn-outline-light align-center"
                  onClick={this.handleWatchedButton}
                  type="button"
                  style={{ height: "50%", fontSize: "10px",marginLeft:"5px" }}
                >
                  Add to Watchlist
                </button>
              </div>

              <p className="d-inline-block float-right align-text-bottom">
                {this.props.stock.exchange}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Chart data={this.props.stock.symbol} />
            </div>
            <div className="col-6">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <Stats data={this.props.stock} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Sentiment data={this.props.stock.sentiments} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockProfile;
