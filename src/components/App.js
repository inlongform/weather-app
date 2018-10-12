import React, { Component } from "react";
import SideBar from "./SideBar/SideBar";
import Forcast from "./Forcast/Forcast";
import axios from "axios";
import { BASE_PATH, DEFAULT_LOCATION, TEMP_DISPLAY } from "../utils/constants";
import "../styles/App.css";
import { setCookies, getCookies } from "../utils/cookies";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: DEFAULT_LOCATION,
      conditions: null,
      prevLocations: [],
      temp: TEMP_DISPLAY
    };
  }

  componentWillMount() {
    const cookies = getCookies("locations");
    console.log(cookies);
    if (cookies) {
      const locs = cookies.reverse();
      this.setState({
        prevLocations: locs
      });
      this.locationSelected(locs[locs.length - 1]);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const queryLatLongUri = `${BASE_PATH}select%20*%20from%20weather.forecast where u=${
            this.state.temp
          } AND woeid in (select woeid from geo.places(1) where text="(${
            position.coords.latitude
          },${position.coords.longitude})")&format=json`;
          this.queryLocation(queryLatLongUri);
        });
      } else {
        this.locationSelected(this.state.location);
      }
    }
  }

  locationSelected(loc) {
    const queryUri = `${BASE_PATH}select%20*%20from%20weather.forecast where u='${
      this.state.temp
    }' AND woeid in (select woeid from geo.places(1) where text="${loc}")&format=json`;
    this.queryLocation(queryUri);
  }

  newLocations(newLoc) {
    let prevLocs = this.state.prevLocations;
    if (prevLocs.indexOf(newLoc) < 0) {
      prevLocs.push(newLoc);
    }
    return prevLocs;
  }

  removeLocation(loc) {
    const newLocations = this.state.prevLocations.filter(item => {
      return item !== loc;
    });

    this.setState({
      prevLocations: newLocations
    });
    setCookies("locations", newLocations);
  }

  queryLocation(uri) {
    axios
      .get(uri)
      .then(res => {
        const channel = res.data.query.results.channel;
        const newLoc = channel.location.city + ", " + channel.location.region;
        const newLocations = this.newLocations(newLoc).reverse();
        this.setState({
          location: newLoc,
          conditions: channel.item,
          prevLocations: newLocations
        });
        setCookies("locations", newLocations);
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
          removeLocation={this.removeLocation.bind(this)}
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
