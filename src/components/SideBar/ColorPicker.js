import PickerBtn from "./PickerBtn";

import React from "react";

export default () => {
  const colors = [
    "#c54c3c",
    "#F4DBD9",
    "#2D3B57",
    "#E79D1A",
    "#412F3F",
    "#EC7246",
    "#5D2433",
    "#2C442E",
    "#8BD495"
  ];
  return (
    <div className="picker">
      {colors.map((color, i) => {
        return <PickerBtn color={color} key={i} />;
      })}
    </div>
  );
};
