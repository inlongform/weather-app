import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import weatherReducer from "./reducers/weatherReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  weatherReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
