import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// class Loadscreen extends Component {
//   render() {
//     return (
//       <div
//         className="loadscreen"
//         style={{
//           position: "absolute",
//           top: "10%",
//           left: "5%",
//           width: "90%",
//           height: "85%",
//           zIndex: -1
//         }}
//       >
//         <div
//           className="spinner"
//           style={{ position: "absolute", top: "50%", left: "50%" }}
//         >
//           <FontAwesomeIcon icon="cog" spin />
//           {" "}Loading
//         </div>
//       </div>
//     );
//   }
// }                ANOTHER TYPE

class Loadscreen extends Component {
    render() {
      return (
        <div
          className="innerscreen"
          id="loadscreen"
        >
          <div
            className="spinner"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          >
            <FontAwesomeIcon icon="cog" spin />
            {" "}Loading
          </div>
        </div>
      );
    }
  }
export default Loadscreen;
