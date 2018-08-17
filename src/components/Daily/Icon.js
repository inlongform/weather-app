import React from "react";

export default ({ code, isToday }) => {
  const name = `wi wi-yahoo-${code} ` + (isToday ? "today" : "");
  return <i className={name} />;
};
