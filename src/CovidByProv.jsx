import React, { Component } from "react";
import axios from "axios";

export class CovidRecovered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveredCountry: [],
    };
  }

  getRecoveredCountry = () => {
    axios
      .get("https://indonesia-covid-19.mathdro.id/api/provinsi")
      .then((res) => {
        this.setState({
          recoveredCountry: res.data.data,
        });
      });
  };

  componentDidMount() {
    this.getRecoveredCountry();
  }
  render() {
    return (
      <>
        <div className="card_app">
          <div className="card_content_daily">
            <div className="card_content_title">
              <h1>Per Provinsi</h1>
            </div>

            {this.state.recoveredCountry.map((item, index) => {
              return (
                <div key={index} className="card_recovered">
                  <h3 className="color_recovered">{item.provinsi}</h3>
                  {item.provinsi === "Indonesia" ? (
                    ""
                  ) : (
                    <p>{`Sembuh: ${item.kasusSemb}`}</p>
                  )}

                  {item.provinsi === "Indonesia" ? (
                    ""
                  ) : (
                    <p>{`Meninggal: ${item.kasusMeni}`}</p>
                  )}

                  {item.provinsi === "Indonesia" ? (
                    ""
                  ) : (
                    <p>{`Sembuh: ${item.kasusPosi}`}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default CovidRecovered;
