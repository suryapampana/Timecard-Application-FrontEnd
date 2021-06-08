import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { AttendanceReducer } from "./AttendanceReducer";
import { EmployeeReducer } from "./EmployeeReducer";
import { LeaveReducer } from "./LeaveReducer";

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  attendance: AttendanceReducer,
  leave: LeaveReducer,
  //depart : DepartRducer,
  //vechil: VechuileReucer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
