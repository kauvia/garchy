import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }
  componentDidMount() {
    let stock = prompt('what stock?');
    console.log(stock)
    axios.post("/home", { ticker: stock }).then(res => {
      console.log(res.data);
      this.setState({ imageUrl: res.data.image });
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Garchy</div>
          <img alt={'chart is loading'} src={this.state.imageUrl} />
        </header>
      </div>
    );
  }
}

export default App;
