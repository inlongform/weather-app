import React, { Component } from "react";
import { NavItem, NavLink, Button } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWeather, removeLocations } from "../../actions/weatherActions";

class LocationBtn extends Component {
  constructor(props) {
    super(props);

    this.onLocationSelected = this.onLocationSelected.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  onLocationSelected(e) {
    const { prevLocations } = this.props.info;

    this.props.getWeather(this.props.item, prevLocations);
  }

  onRemoveItem(e) {
    const { prevLocations } = this.props.info;
    this.props.removeLocations(prevLocations, this.props.item);
  }

  render() {
    const { item } = this.props;
    return (
      <NavItem>
        <NavLink href="#" onClick={this.onLocationSelected}>
          {item}
        </NavLink>
        <Button
          className="close"
          aria-label="Close"
          onClick={this.onRemoveItem}
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </NavItem>
    );
  }
}

LocationBtn.propTypes = {
  getWeather: PropTypes.func.isRequired,
  removeLocations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info,
  options: state.options
});
export default connect(
  mapStateToProps,
  { getWeather, removeLocations }
)(LocationBtn);
