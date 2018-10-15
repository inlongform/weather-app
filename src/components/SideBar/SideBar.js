import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import { Navbar, NavbarToggler, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ColorPicker from "./ColorPicker";
import LocationList from "./LocationList";
import SettingsPopover from "./SettingsPopover";
import { getWeather } from "../../actions/weatherActions";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onPlaceSelected(e) {
    this.props.getWeather(e.formatted_address, this.props.info.prevLocations);

    this.setState({
      isOpen: false
    });
  }

  render() {
    const { info } = this.props;
    return (
      <Navbar
        color="white"
        dark
        className={!this.state.isOpen ? "hidden" : null}
      >
        <NavbarToggler onClick={this.toggle} />

        <SettingsPopover />

        <h4>Select a City</h4>
        <FormGroup>
          <Autocomplete
            className="form-control"
            id="location"
            placeholder={info.location}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
        </FormGroup>

        <ColorPicker />
        <LocationList prevLocations={info.prevLocations} />
      </Navbar>
    );
  }
}

SideBar.propTypes = {
  getWeather: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info
});

export default connect(
  mapStateToProps,
  { getWeather }
)(SideBar);
