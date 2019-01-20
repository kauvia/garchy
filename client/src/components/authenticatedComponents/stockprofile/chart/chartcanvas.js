import React, { Component } from "react";

class ChartCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      barsArr: [],
      monthsArr: [],
      canvasHeight: 600,
      canvasWidth: 600,
      xMult: 5,
      yMult: 1,
      baseY: 0,
      maxY: 0,
      userX: 0,
      initX: 0,
      userY: 0,
      initY: 0,
      down: false
    };
    this.canvasRef = React.createRef();

    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mouseControl = this.mouseControl.bind(this);
  }
  componentWillUnmount() {
    console.log("cancelling animation frage");
    cancelAnimationFrame(this.rAF);
  }
  componentDidMount() {
    this.getChartInfo();
    //   const c = canvas.getContext("2d");
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  mouseControl(e) {
    // console.log('downing mouse',e.clientX,e.clientY,e.button,e.type)
    e.preventDefault();
    let { down, initX, userX, initY, userY, xMult, yMult } = this.state;
    if (e.type === "mouseup") {
      this.setState({ down: false });
    } else if (e.type === "mousedown") {
      this.setState({
        down: true,
        initX: e.clientX + userX,
        initY: e.clientY + userY
      });
    }
    if (down) {
      let x = Math.round(initX - e.clientX);
      if (x < 0) {
        this.setState({ userX: x });
      }
      let y = Math.round(initY - e.clientY);
      if (y) {
        this.setState({ userY: y });
      }
      //   console.log(this.state.userX, this.state.userY);
    }
    if (e.type === "wheel") {
      if (e.deltaY < 0) {
        if (yMult && e.ctrlKey) {
          this.setState({ yMult: yMult * 1.1 });
        }
        if (xMult && !e.ctrlKey) {
          this.setState({ xMult: xMult * 1.1 });
        }
      }
      if (e.deltaY > 0) {
        if (yMult && e.ctrlKey) {
          this.setState({ yMult: yMult * 0.9 });
        }
        if (xMult && !e.ctrlKey) {
          this.setState({ xMult: xMult * 0.9 });
        }
      }
    }
  }
  updateAnimationState() {
    let {
      xMult,
      yMult,
      barsArr,
      canvasHeight,
      canvasWidth,
      baseY,
      maxY,
      userX,
      userY
    } = this.state;
    this.zoomPan();
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    const canvas = this.canvasRef.current;
    const c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBars(
      c,
      xMult,
      yMult,
      barsArr,
      canvasHeight,
      canvasWidth,
      baseY,
      userX,
      userY
    );
    this.drawGrids(
      c,
      xMult,
      yMult,
      canvasHeight,
      canvasWidth,
      baseY,
      maxY,
      userY,
      userX
    );
  }
  zoomPan(minY, maxY) {
    if (minY) {
      this.setState({ baseY: -minY });
    }
    if (maxY) {
      this.setState({ maxY: maxY });
    }
    //NEGATIVE TO GO UP
  }
  setupBars() {
    let count = 0;
    let tempArr = [];
    let dateArr = [];
    let tempDate;
    let tempDateCount = 0;
    //   let day = 1000 * 60 * 60 * 24;
    this.state.data.map(val => {
      //     let date = Date.parse(val.date) - Date.parse(this.state.data[0].date);
      //    date = date / day + 1;
      tempDateCount++;
      let s = val.date.split("-");
      if (tempDate !== s[0] + "-" + s[1]) {
        tempDate = s[0] + "-" + s[1];
        dateArr.push({ date: tempDate, posX: count,dateCount:tempDateCount });
     //   tempDateCount;

      }

      count++; // use count for no gaps, date for gaps

      tempArr.push({
        posX: count,
        open: val.open,
        high: val.high,
        low: val.low,
        close: val.close
      });
      return tempArr; // return just to get rid of webpack
    });
    this.setState({
      barsArr: tempArr,
      monthsArr: dateArr,
      userX: -count + this.state.canvasWidth / this.state.xMult
    });
    console.log(dateArr);

    // console.log(this.state.userX*this.state.xMult)
  }
  drawBars(c, xMult, yMult, arr, cH, cW, baseY, userX, userY) {
    //   console.log(userX)
    let minY = 1000000;
    let maxY = 0;
    arr.map(val => {
      if (-userX < val.posX && -userX + cH / xMult > val.posX) {
        if (val.low < minY) {
          minY = val.low;
        }
        if (val.high > maxY) {
          maxY = val.high;
        }
      }

      c.beginPath();
      c.moveTo(
        userX * xMult + val.posX * xMult,
        userY * yMult + cH - val.low * yMult - this.state.baseY * yMult
      );
      c.lineTo(
        userX * xMult + val.posX * xMult,
        userY * yMult + cH - val.high * yMult - baseY * yMult
      );
      c.stroke();
      c.rect(
        userX * xMult + val.posX * xMult - xMult / 2,
        userY * yMult + cH - val.open * yMult - baseY * yMult,
        xMult,
        Math.abs(val.open * yMult - val.close * yMult)
      );
      val.open < val.close ? (c.fillStyle = "green") : (c.fillStyle = "red");
      c.fill();
      return maxY; // return just to get rid of webpack
    });
    //  console.log(minY,maxY)
    this.zoomPan(minY, maxY);
  }
  drawGrids(c, xMult, yMult, cH, cW, baseY, maxY, userY, userX) {
    let numLines = Math.round(maxY / 100);
    let minLines = (cH * yMult) / 100 - (baseY * yMult) / 100;
    if (numLines < minLines) {
      numLines = minLines;
    }
    for (let i = 0; i < 100; i++) {
      c.beginPath();
      c.moveTo(0, userY * yMult + cH - 100 * i * yMult - baseY * yMult);
      c.lineTo(cW, userY * yMult + cH - 100 * i * yMult - baseY * yMult);
      c.stroke();
      c.font = "15px Arial";
      c.strokeText(
        `${100 * i}`,
        cW - 50,
        userY * yMult + cH - 3 - 100 * i * yMult - baseY * yMult
      );
    }

    if (this.state.monthsArr.length > 0) {
      let numMonths=this.state.monthsArr.length
      for (let i = 0;i<numMonths ; i++) {
        c.beginPath();
        c.moveTo( this.state.monthsArr[i].dateCount * xMult + userX * xMult, 0);
        c.lineTo( this.state.monthsArr[i].dateCount   * xMult + userX * xMult, cH);
        c.stroke();
        c.setTransform(1,0,0,1,this.state.monthsArr[i].dateCount *xMult +userX*xMult+5,5);
        c.rotate(Math.PI/2);
        c.strokeText(`${this.state.monthsArr[i].date}`,0,0);
        c.setTransform(1,0,0,1,0,0)
      }
    }
  }
  handleChange() {}
  handleSubmit() {}
  getChartInfo() {
    fetch("https://api.iextrading.com/1.0/stock/goog/chart/5y").then(val =>
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
          onMouseDown={this.mouseControl}
          onMouseMove={this.mouseControl}
          onMouseUp={this.mouseControl}
          onWheel={this.mouseControl}
        />
      </div>
    );
  }
}

export default ChartCanvas;
