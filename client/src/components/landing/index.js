import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isNewAccount: false,
      message: "",
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    if ("username" === target.name) {
      this.setState({ [target.name]: target.value });
    } else if ("password" === target.name) {
      this.setState({ [target.name]: target.value });
    } else if ("isNewAccount" === target.name) {
      this.setState({ [target.name]: target.checked });
    }
  }
  handleSubmit(e) {
    if (this.state.isNewAccount) {
      if (this.state.password.length < 8) {
        this.setState({
          message: "Password needs to be at least 8 characters."
        });
      } else {
        this.dbCreateUser();
      }
    } else {
      this.dbLogIn();
    }
    e.preventDefault();
  }
  dbCreateUser() {
    fetch("http://localhost:3011/users/new", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res.json().then(res => {
        if (res.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", res.token);
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ message: res.message });
        }
      })
    );
  }
  dbLogIn() {
    fetch("http://localhost:3011/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res.json().then(res => {
        console.log(res);
        if (res.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", res.token);
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ message: res.message });
        }
      })
    );
  }
  componentDidMount() {
    if (localStorage.length > 0) {
      console.log("fetching");
      fetch("http://localhost:3011/validate", {
        method: "GET",
        headers: {
          "X-Access-Token": `Bearer ${localStorage.getItem("token")}`,
          "validate-only": true
        }
      }).then(res =>
        res.json().then(res => {
          console.log(res);
          this.setState({ isLoggedIn: true });

          if (!res.success) {
            console.log(res);
            localStorage.clear();
          }
        })
      );
    }
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 100 + "vh" }}
        >
          <form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            style={{ width: 250 + "px" }}
          >
            <div className="form-group">
              <label htmlFor="inputUsername">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter password"
              />
            </div>
            <div className="form-check">
              <input
                name="isNewAccount"
                type="checkbox"
                className="form-check-input"
                id="checkNewAccount"
                defaultChecked={this.state.isNewAccount}
              />
              <label className="form-check-label" htmlFor="checkNewAccount">
                New User
              </label>
            </div>
            <button type="submit" value="Submit" className="btn btn-primary">
              Submit
            </button>
            <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
              {this.state.message}
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Landing;
