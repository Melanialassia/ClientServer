// import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import reducer from "../reducer/reducer";
// import thunkMiddleware from "redux-thunk";
// // Create the Redux store with the DevTools Extension
// const store = createStore(
//   reducer,
//   composeWithDevTools(
//     applyMiddleware(thunkMiddleware)
//   )
// );
// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/reducer";
import { thunk } from 'redux-thunk';

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunk))
);

export default store;