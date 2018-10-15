import { BASE_PATH } from "./constants";

export const buildUri = (loc, temp, isLatLong = false) => {
  if (isLatLong) {
    return `${BASE_PATH}select%20*%20from%20weather.forecast where u='${temp}' AND woeid in (select woeid from geo.places(1) where text="(${
      loc.coords.latitude
    },${loc.coords.longitude})")&format=json`;
  } else {
    return `${BASE_PATH}select%20*%20from%20weather.forecast where u='${temp}' AND woeid in (select woeid from geo.places(1) where text="${loc}")&format=json`;
  }
};
