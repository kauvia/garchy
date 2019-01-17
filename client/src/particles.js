import React from "react";
import Particles from "react-particles-js";
const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default () => (
  <div className="background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex:-1,
    }}
  >
    <Particles params={particleOptions}/>
  </div>
);
