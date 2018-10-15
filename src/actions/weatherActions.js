import axios from "axios";
import {
  GET_DISPLAY_PARAMS,
  GET_WEATHER,
  REMOVE_LOCATIONS,
  SET_BG_COLOR,
  SET_TEMP
} from "./types";
import { getCookies, setCookies } from "../utils/cookies";
import { buildUri } from "../utils/uriBuilder";
import { sortNewLocations, removeLocation } from "../utils/sortLocations";
import { DEFAULT_COLOR, TEMP_DISPLAY } from "../utils/constants";

export const getWeather = (loc, prevLocs, isLat = false) => dispatch => {
  const temp = getCookies("temp") || TEMP_DISPLAY;
  const bgColor = getCookies("bgColor") || DEFAULT_COLOR;

  const queryUri = buildUri(loc, temp, isLat);

  axios
    .get(queryUri)
    .then(res => {
      const channel = res.data.query.results.channel;
      const newLoc =
        channel.location.city + ", " + channel.location.region.trim();

      let newLocations = [];
      if (prevLocs) {
        newLocations = sortNewLocations(prevLocs, newLoc);
      } else {
        newLocations = [newLoc];
      }

      dispatch({
        type: GET_WEATHER,
        payload: {
          location: newLoc,
          conditions: channel.item,
          prevLocations: newLocations,
          temp: temp,
          bgColor: bgColor
        }
      });
      setCookies("locations", newLocations);
    })
    .catch(err => alert(err));
};

export const setBgColor = color => dispatch => {
  dispatch({
    type: SET_BG_COLOR,
    payload: {
      bgColor: color
    }
  });
  document.body.style.backgroundColor = color;
  setCookies("bgColor", color);
};

export const removeLocations = (prevLocs, rmLoc) => dispatch => {
  const newLocs = removeLocation(prevLocs, rmLoc);
  dispatch({
    type: REMOVE_LOCATIONS,
    payload: {
      prevLocations: newLocs
    }
  });

  setCookies("locations", newLocs);
};

export const getDisplayParams = () => dispatch => {
  const bgColor = getCookies("bgColor");
  const temp = getCookies("temp");
  const prevLocs = getCookies("locations");

  dispatch({
    type: GET_DISPLAY_PARAMS,
    payload: {
      bgColor: bgColor ? bgColor : DEFAULT_COLOR,
      temp: temp ? temp : TEMP_DISPLAY,
      prevLocations: prevLocs
    }
  });
};

export const setTemp = temp => dispatch => {
  setCookies("temp", temp);
  dispatch({
    type: SET_TEMP,
    payload: {
      temp: temp
    }
  });
};
