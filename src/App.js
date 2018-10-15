import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SideBar from "./components/SideBar/SideBar";
import Forcast from "./components/Forcast/Forcast";
import { DEFAULT_COLOR, DEFAULT_LOCATION } from "./utils/constants";

import {
  getDisplayParams,
  getWeather,
  setBgColor
} from "./actions/weatherActions";
import { setCookies } from "./utils/cookies";

import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.props.getDisplayParams();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.info && !this.state.loaded) {
      const { info } = nextProps;
      const prevLocs = info.prevLocations || [];

      if (info.bgColor) {
        nextProps.setBgColor(info.bgColor || DEFAULT_COLOR);
      }

      if (prevLocs.length > 0) {
        nextProps.getWeather(prevLocs[prevLocs.length - 1], prevLocs);
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            nextProps.getWeather(position, prevLocs, true);
          });
        } else {
          nextProps.getWeather(DEFAULT_LOCATION, prevLocs);
        }
      }
      this.setState({
        loaded: true
      });
    }
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

  render() {
    const { info } = this.props;

    return (
      <main>
        {info && info.conditions ? (
          <div className="container">
            <SideBar />
            <Forcast conditions={info.conditions} location={info.location} />
          </div>
        ) : null}
      </main>
    );
  }
}

App.propTypes = {
  getWeather: PropTypes.func.isRequired,
  getDisplayParams: PropTypes.func.isRequired,
  setBgColor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info
});

export default connect(
  mapStateToProps,
  { getWeather, getDisplayParams, setBgColor }
)(App);
