import React from "react";
import { Nav } from "reactstrap";
import LocationBtn from "./LocationBtn";

export default ({ prevLocations }) => {
  return (
    <div className="location-list">
      <h6>Saved Locations</h6>
      <Nav vertical>
        {prevLocations && prevLocations.length > 0
          ? prevLocations.map((item, i) => {
              return <LocationBtn item={item} key={i} />;
            })
          : null}
      </Nav>
    </div>
  );
};
