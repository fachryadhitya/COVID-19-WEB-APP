import React, { Component } from "react";
import axios from "axios";
import Button from "./Button";

import { Pie } from "react-chartjs-2";

class CovidByState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlert: false,
      alert: "",
      country: "Indonesia",
      countryList: {},
      confirmed: "",
      recovered: "",
      deaths: ""
    };
  }
  covidInCountry = () => {
    const baseURL = "https://covid19.mathdro.id/api/countries/";
    const country = this.state.country;
    axios
      .get(baseURL + country)
      .then(res => {
        this.setState({
          confirmed: res.data.confirmed.value,
          recovered: res.data.recovered.value,
          deaths: res.data.deaths.value
        });
      })
      .catch(() => {
        this.setState({
          alert:
            "This Data is not yet ready."
        });
        this.alertChange();
        this.resetAlert();
      });
  };

  covidCountryList = () => {
    const baseURL = "https://covid19.mathdro.id/api/countries";
    axios
      .get(baseURL)
      .then(res => {
        console.log(res);
        this.setState({
          countryList: res.data.countries
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  handleChange = event => {
    // console.log(event.target.value);
    this.setState({
      country: event.target.value
    });
  };

  resetAlert = () => {
    setTimeout(() => {
      this.setState({
        isAlert: !this.state.isAlert
      });
    }, 2000);
  };

  clickSubmit = () => {
    this.covidInCountry();
  };

  alertChange = () => {
    this.setState({
      isAlert: !this.state.isAlert
    });
  };

  componentDidMount() {
    this.covidInCountry();

    this.covidCountryList();
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
              <div className="data_flex">
                <h1>Choose Country:</h1>
                <select
                  className="select_group"
                  value={this.state.country}
                  onChange={this.handleChange}
                >
                  {Object.entries(this.state.countryList).map(
                    ([key, value], index) => {
                      return (
                        <option key={index} id={value} value={key}>
                          {key}
                        </option>
                      );
                    }
                  )}
                </select>
                <Button
                  onClick={this.clickSubmit}
                  className="btn_primary"
                  title="See Data"
                />
              </div>

              
            </div>

            <div className="data_flex">
              <div className="card_grid width_80">
                <Pie data={graph} />
                <div className="card_total">
                  <h2 className="text_center mg-20">
                    {totalReported}
                    <p> Total Reported Case </p>
                  </h2>
                  {/* Alert */}
                  <div
                    className={
                      !this.state.isAlert ? "overlay" : "overlay_active"
                    }
                  >
                    <div
                      className={!this.state.isAlert ? "alert" : "alert_active"}
                    >
                      <p>{this.state.alert}</p>
                    </div>
                  </div>
                  {/* ALert */}
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
export default CovidByState;
