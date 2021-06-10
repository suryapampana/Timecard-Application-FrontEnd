import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

import { AttendanceReducer } from "./AttendanceReducer";
import { EmployeeLoginReducer } from "./EmployeeLoginReducer";
import { EmployeeReducer } from "./EmployeeReducer";
import { LeaveReducer } from "./LeaveReducer";
import { SupervisorLoginReducer } from "./SupervisorLoginReducer";
import { SupervisorReducer } from "./SupervisorReducer";
import { TimecardReducer } from "./TimecardReducer";

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  attendance: AttendanceReducer,
  leave: LeaveReducer,
  timecard: TimecardReducer,
  supervisor: SupervisorReducer,
  employeeLogin: EmployeeLoginReducer,
  supervisorLogin: SupervisorLoginReducer,
  //depart : DepartRducer,
  //vechil: VechuileReucer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
