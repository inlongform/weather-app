import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import { Navbar, NavbarToggler, FormGroup } from "reactstrap";
import ColorPicker from "./ColorPicker";

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
    if (e.formatted_address) {
      this.props.locationSelected(e.formatted_address);
    } else {
      this.props.locationSelected(e);
    }

    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <Navbar
        color="white"
        dark
        className={!this.state.isOpen ? "hidden" : null}
      >
        <NavbarToggler onClick={this.toggle} />
        <h4>Select a City</h4>
        <FormGroup>
          <Autocomplete
            className="form-control"
            id="location"
            placeholder={this.props.location}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
        </FormGroup>

        <ColorPicker />
      </Navbar>
    );
  }
}
export default SideBar;
