const initState = {
  list: [],

  refsup: {},
  sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai", "Agra"],
};

// ACTION TYPES
const SUPERVISOR_CREATE = "SUPERVISOR_CREATE";
const SUPERVISOR_UPDATE = "SUPERVISOR_UPDATE";
const SUPERVISOR_DELETE = "SUPERVISOR_DELETE";
const SUPERVISOR_GET_ALL = "SUPERVISOR_GET_ALL";
const SUPERVISOR_GET_BY_ID = "SUPERVISOR_GET_BY_ID";

const REF_SUPERVISOR = "REF_SUPERVISOR";

// ACTIONS :: COmponents are interacting with this action
export function createSupervisorAction(payload) {
  // return { type: EMPLOYEE_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/supervisor/";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: SUPERVISOR_CREATE, payload: payload });
  };
}

export function updateSupervisorAction(payload) {
  // return { type: EMPLOYEE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/supervisor/update/${payload.supervisorId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefSupervisor({}));
  };
}

export function deleteSupervisorAction(payload) {
  // return { type: EMPLOYEE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/supervisor/${payload.supervisorId}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllSupervisorAction());
  };
}

export function getAllSupervisorAction(payload) {
  // return { type: EMPLOYEE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/supervisor/all";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const supervisorList = await response.json();
    console.log(supervisorList);

    // Update the UI
    dispatch({ type: SUPERVISOR_GET_ALL, payload: supervisorList });
  };
}

export function getByIdSupervisorAction(payload) {
  // return { type: EMPLOYEE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/supervisor/${payload.supervisorId}`;
    const response = await fetch(url);
    const supervisorObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefSupervisor(supervisorObj));
  };
}

export function updateRefSupervisor(payload) {
  return { type: REF_SUPERVISOR, payload: payload };
}

// REDUCER LOGIC
export function SupervisorReducer(state = initState, action) {
  switch (action.type) {
    case SUPERVISOR_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case SUPERVISOR_UPDATE:
      // TODO
      return state;
    case SUPERVISOR_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case SUPERVISOR_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case SUPERVISOR_GET_BY_ID:
      // TODO
      return state;

    case REF_SUPERVISOR:
      return { ...state, refsup: action.payload };

    default:
      return state;
  }
}
