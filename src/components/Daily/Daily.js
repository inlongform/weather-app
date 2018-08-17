import React, { Component } from "react";
import Icon from "./Icon";
import { Alert } from "reactstrap";

class Daily extends Component {
  showConditions() {
    if (this.props.weather) {
      return (
        <div className="daily">
          <Icon code={this.props.weather.code} />
          <div className="info">
            {this.props.weather.temp ? (
              <h3>
                <span className="temp bold-text">
                  {this.props.weather.temp}
                </span>
              </h3>
            ) : (
              <h3>
                <span className="temp bold-text">
                  {this.props.weather.high}
                </span>{" "}
                <span className="temp">{this.props.weather.low}</span>
              </h3>
            )}
            {this.props.weather.day ? (
              <h1>{this.props.weather.day}</h1>
            ) : (
              <h1>NOW</h1>
            )}

            <h5>{this.props.weather.text}</h5>
          </div>
        </div>
      );
    } else {
      return (
        <div className="daily">
          <Alert color="danger">Error getting data</Alert>
        </div>
      );
    }
  }
  render() {
    return <div>{this.showConditions()}</div>;
  }
}

export default Daily;
