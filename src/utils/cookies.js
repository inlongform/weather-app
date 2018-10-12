import Cookie from "js-cookie";
import { COOKIE_EXPIRE } from "./constants";

export const setCookies = (cookieName, data) => {
  Cookie.set(cookieName, data, { expires: COOKIE_EXPIRE });
};

export const getCookies = cookie => {
  return Cookie.getJSON(cookie);
};
