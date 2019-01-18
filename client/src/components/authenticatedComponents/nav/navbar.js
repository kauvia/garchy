import React, { Component } from "react";

class Navbar extends Component {



  render() {
    return (
      <nav className="navbar sticky-top navbar-light bg-transparent text-light">
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button><div className="col-1">Garchy</div>
      {this.props.children}
      </nav>
    );
  }

}

export default Navbar;
