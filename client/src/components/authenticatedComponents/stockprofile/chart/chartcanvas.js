import React, { Component } from "react";

class ChartCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      barsArr: [],
      canvasHeight: 300,
      canvasWidth: 15000,
      barWidthMulti: 10,
      barHeightMulti: 2,
      baseY: 0
    };
    this.canvasRef = React.createRef();

    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getChartInfo();
    const canvas = this.canvasRef.current;
    const c = canvas.getContext("2d");
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  updateAnimationState() {
    this.zoomPan();
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const canvas = this.canvasRef.current;
    const c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBars(c);
    this.drawGrids(c);
  }
  zoomPan(minY) {
    if (minY) {
      console.log(minY);
      this.setState({ baseY: -minY + 50 });
    }
    //NEGATIVE TO GO UP
  }
  setupBars() {
    let count = 0;
    let tempArr = [];
    let day = 1000 * 60 * 60 * 24;
    this.state.data.map(val => {
      let date = Date.parse(val.date) - Date.parse(this.state.data[0].date);
      date = date / day + 1;

      count++; // use count for no gaps, date for gaps

      tempArr.push({
        posX: count,
        open: this.state.canvasHeight - val.open,
        high: this.state.canvasHeight - val.high,
        low: this.state.canvasHeight - val.low,
        close: this.state.canvasHeight - val.close
      });
    });
    this.setState({ barsArr: tempArr });
  }
  drawBars(c) {
    let minY = 1000000;
    this.state.barsArr.map(val => {
      if (val.low < minY) {
        minY = val.low;
      }
      c.beginPath();
      c.moveTo(
        val.posX * this.state.barWidthMulti,
        val.low * this.state.barHeightMulti -
          this.state.baseY * this.state.barHeightMulti
      );
      c.lineTo(
        val.posX * this.state.barWidthMulti,
        val.high * this.state.barHeightMulti -
          this.state.baseY * this.state.barHeightMulti
      );
      c.stroke();
      c.rect(
        val.posX * this.state.barWidthMulti - this.state.barWidthMulti / 2,
        val.open * this.state.barHeightMulti -
          this.state.baseY * this.state.barHeightMulti,
        this.state.barWidthMulti,
        Math.abs(
          val.open * this.state.barHeightMulti -
            val.close * this.state.barHeightMulti
        )
      );
      val.open > val.close ? (c.fillStyle = "green") : (c.fillStyle = "red");
      c.fill();
    });
    this.zoomPan(minY);
  }
  drawGrids(c) {
    //    let height = this.state.canvasHeight/y
    for (let i = 0; i < 5; i++) {
      c.beginPath();
      c.moveTo(0, 100 * i * this.state.barHeightMulti);
      c.lineTo(this.state.canvasWidth, 100 * i * this.state.barHeightMulti);
      c.stroke();
    }
  }
  handleChange() {}
  handleSubmit() {}
  getChartInfo() {
    fetch("https://api.iextrading.com/1.0/stock/aapl/chart/5y").then(val =>
      val.json().then(val => {
        this.setState({ data: val });
        this.setupBars();
      })
    );
  }
  render() {
    return (
      <div>
        <canvas
          id="chart-canvas"
          ref={this.canvasRef}
          width={this.state.canvasWidth}
          height={this.state.canvasHeight}
        />
      </div>
    );
  }
}

export default ChartCanvas;
