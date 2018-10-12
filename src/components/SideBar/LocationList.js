import React, { Component } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";

class LocationList extends Component {
  onLocationSelected(item) {
    this.props.locationSelected(item);
  }

  onRemoveItem(item) {
    this.props.onPlacedRemoved(item);
  }

  render() {
    const { prevLocations } = this.props;

    return (
      <div className="location-list">
        <h6>Saved Locations</h6>
        <Nav vertical>
          {prevLocations && prevLocations.length > 0
            ? prevLocations.map((item, i) => {
                return (
                  <NavItem key={i}>
                    <NavLink
                      href="#"
                      onClick={this.onLocationSelected.bind(this, item)}
                    >
                      {item}
                    </NavLink>
                    <Button
                      className="close"
                      aria-label="Close"
                      onClick={this.onRemoveItem.bind(this, item)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </NavItem>
                );
              })
            : null}
        </Nav>
      </div>
    );
  }
}

export default LocationList;
