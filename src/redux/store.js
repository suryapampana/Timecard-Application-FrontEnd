import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { AttendanceReducer } from "./AttendanceReducer";

const rootReducer = combineReducers({
  attendance: AttendanceReducer,
  //depart : DepartRducer,
  //vechil: VechuileReucer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
