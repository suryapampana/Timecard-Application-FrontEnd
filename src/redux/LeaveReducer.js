const initState = {
  list: [],

  reflev: {},
  sampleList: ["Delhi", "Kolkata", "chennai", "Kenya"],
};

// ACTION TYPES
const LEAVE_APPLY = "LEAVE_APPLY";
const LEAVE_UPDATE = "LEAVE_UPDATE";
const LEAVE_DELETE = "LEAVE_DELETE";
const LEAVE_GET_ALL = "LEAVE_GET_ALL";
const LEAVE_GET_BY_ID = "LEAVE_GET_BY_ID";

const REF_LEAVE = "REF_LEAVE";

// ACTIONS :: COmponents are interacting with this action
export function applyLeaveAction(payload) {
  // return { type: LEAVE_APPLY, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/leave/apply/${payload.employeeId}`;
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: LEAVE_APPLY, payload: payload });
  };
}

export function updateLeaveAction(payload) {
  // return { type: LEAVE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/leave/update/${payload.leaveId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefLeave({}));
  };
}

export function deleteLeaveAction(payload) {
  // return { type: LEAVE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/leave/${payload.leaveId}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllLeaveAction());
  };
}

export function getAllLeaveAction(payload) {
  // return { type: LEAVE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/leave/all";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const leaveList = await response.json();
    console.log(leaveList);

    // Update the UI
    dispatch({ type: LEAVE_GET_ALL, payload: leaveList });
  };
}

export function getByIdLeaveAction(payload) {
  // return { type: LEAVE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/leave/${payload.leaveId}`;
    const response = await fetch(url);
    const leaveObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefLeave(leaveObj));
  };
}

export function updateRefLeave(payload) {
  return { type: REF_LEAVE, payload: payload };
}

// REDUCER LOGIC
export function LeaveReducer(state = initState, action) {
  switch (action.type) {
    case LEAVE_APPLY:
      return { ...state, list: [action.payload, ...state.list] };
    case LEAVE_UPDATE:
      // TODO
      return state;
    case LEAVE_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case LEAVE_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case LEAVE_GET_BY_ID:
      // TODO
      return state;

    case REF_LEAVE:
      return { ...state, reflev: action.payload };

    default:
      return state;
  }
}
