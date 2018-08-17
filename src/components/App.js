import React, { Component } from "react";
import SideBar from "./SideBar/SideBar";
import Forcast from "./Forcast/Forcast";
import axios from "axios";
import { BASE_PATH, DEFAULT_LOCATION } from "../utils/constants";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: DEFAULT_LOCATION,
      conditions: null,
      prevLocations: []
    };
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const queryLatLongUri = `${BASE_PATH}select%20*%20from%20weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="(${
          position.coords.latitude
        },${position.coords.longitude}9)")&format=json`;
        this.queryLocation(queryLatLongUri);
      });
    } else {
      this.locationSelected(this.state.location);
    }
  }

  locationSelected(loc) {
    const queryUri = `${BASE_PATH}select%20*%20from%20weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="${loc}")&format=json`;
    this.queryLocation(queryUri);
  }

  queryLocation(uri) {
    axios
      .get(uri)
      .then(res => {
        const location = res.data.query.results.channel.location;
        const newLoc = location.city + ", " + location.region;
        this.setState(prevState => ({
          location: newLoc,
          conditions: res.data.query.results.channel.item,
          prevLocations:
            this.state.prevLocations.indexOf(newLoc) < 0
              ? [...prevState.prevLocations, newLoc]
              : [...prevState.prevLocations]
        }));
      })
      .catch(err => alert("im sorry there was a problem retrieving data"));
  }

  render() {
    return (
      <main>
        <SideBar
          location={this.state.location}
          locationSelected={this.locationSelected.bind(this)}
          prevLocations={this.state.prevLocations}
        />
        {this.state.conditions ? (
          <Forcast
            conditions={this.state.conditions}
            location={this.state.location}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
