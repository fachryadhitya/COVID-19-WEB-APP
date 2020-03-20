import React, { Component } from "react";

import CovidByState from "./CovidByState";
import CovidByWorld from "./CovidByWorld";
import About from "./About";


class Home extends Component {
  render() {
    return (
      <>
        <div className="data_flex">
          { <div className="card_grid">
            <CovidByWorld />
          </div> }

          <div className="card_grid">
            <CovidByState />
          </div>
        </div>

        { <div className="data_flex">
          <div className="width_30">
          
            { <About /> }
          </div>
          {/* <div className="width_40">
            <CovidDaily />
          </div>
          <div className="width_30">
            <CovidRecovered />
          </div> */}
        </div> }
        {/* <div className="card_center">
     
        </div> */}
      </>
    );
  }
}
export default Home;
