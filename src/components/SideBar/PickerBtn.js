import React from "react";

export default ({ color }) => {
  return (
    <div
      onClick={e => (document.body.style.backgroundColor = color)}
      style={{ backgroundColor: color }}
      className="color-btn"
    />
  );
};
