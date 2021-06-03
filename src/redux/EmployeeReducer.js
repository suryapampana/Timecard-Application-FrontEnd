const initState = {
  list: [],

  refemp: {},
  sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai"],
};

// ACTION TYPES
const EMPLOYEE_CREATE = "EMPLOYEE_CREATE";
const EMPLOYEE_UPDATE = "EMPLOYEE_UPDATE";
const EMPLOYEE_DELETE = "EMPLOYEE_DELETE";
const EMPLOYEE_GET_ALL = "EMPLOYEE_GET_ALL";
const EMPLOYEE_GET_BY_ID = "EMPLOYEE_GET_BY_ID";

const REF_EMPLOYEE = "REF_EMPLOYEE";

// ACTIONS :: COmponents are interacting with this action
export function createEmployeeAction(payload) {
  return { type: EMPLOYEE_CREATE, payload: payload };
}

export function updateEmployeeAction(payload) {
  return { type: EMPLOYEE_UPDATE, payload: payload };
}

export function deleteEmployeeAction(payload) {
  return { type: EMPLOYEE_DELETE, payload: payload };
}

export function getAllEmployeeAction(payload) {
  return { type: EMPLOYEE_GET_ALL, payload: payload };
}

export function getByIdEmployeeAction(payload) {
  return { type: EMPLOYEE_GET_BY_ID, payload: payload };
}

export function updateRefEmployee(payload) {
  return { type: REF_EMPLOYEE, payload: payload };
}

// REDUCER LOGIC
export function EmployeeReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case EMPLOYEE_UPDATE:
      // TODO
      return state;
    case EMPLOYEE_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case EMPLOYEE_GET_ALL:
      // TODO
      return state;
    case EMPLOYEE_GET_BY_ID:
      // TODO
      return state;

    case REF_EMPLOYEE:
      return { ...state, refemp: action.payload };

    default:
      return state;
  }
}
