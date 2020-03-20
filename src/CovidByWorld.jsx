import React, { Component } from "react";
import axios from "axios";

import { Doughnut } from "react-chartjs-2";

class CovidInTheWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: "",
      recovered: "",
      deaths: ""
    };
  }
  covidInTheWorld = () => {
    const baseURL = "https://indonesia-covid-19.mathdro.id/api";
    axios
      .get(baseURL)
      .then(res => {
        // console.log(res);
        this.setState({
          confirmed: res.data.jumlahKasus,
          recovered: res.data.sembuh,
          deaths: res.data.meninggal
        });
      })
      .catch(err => {
        if (err) {
          alert("Network Connection?");
        }
      });
  };

  componentDidMount() {
    this.covidInTheWorld();
  }
  render() {
    const confirmedValue = this.state.confirmed;
    const recoveredValue = this.state.recovered;
    const deathsValue = this.state.deaths;
    const totalReported = confirmedValue + recoveredValue + deathsValue;

    const graph = {
      //   labels: ["Confirmed", "Recovered", "Deaths"],
      datasets: [
        {
          data: [confirmedValue, recoveredValue, deathsValue],
          backgroundColor: ["#f1b811", "#00cc98", "#ff4f4f"],
          hoverBackgroundColor: ["#f1b811", "#00cc98", "ff4f4f"]
        }
      ]
    };
    return (
      <>
        <div className="card_app">
          <div className="card_content">
            <div className="card_content_title">
              <h1>COVID-19 Data In Indonesia</h1>
              
            </div>

            <div className="data_flex">
              <div className="card_grid width_80">
                <Doughnut data={graph} />
                <div className="card_total">
                  <h2 className="text_center mg-20">
                    {totalReported}
                    <p> Total Reported Case </p>
                  </h2>
                </div>
              </div>
              <div className="card_grid width_20">
                <div className="data_corona">
                  <h2>{this.state.confirmed}</h2>
                  <h3 className="color_confirmed">Confirmed</h3>
                  <h2>{this.state.recovered}</h2>
                  <h3 className="color_recovered">Recovered</h3>
                  <h2>{this.state.deaths}</h2>
                  <h3 className="color_deaths">Deaths</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CovidInTheWorld;
