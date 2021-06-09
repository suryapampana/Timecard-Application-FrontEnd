const initState = {
  list: [],

  reftc: {},
  sampleList: ["Sai", "Karim", "Satya", "Surya", "Sunil", "Ramji"],
};

// ACTION TYPES
const TIMECARD_ADD = "TIMECARD_ADD";
const TIMECARD_UPDATE = "TIMECARD_UPDATE";
const TIMECARD_DELETE = "TIMECARD_DELETE";
const TIMECARD_GET_ALL = "TIMECARD_GET_ALL";
const TIMECARD_GET_BY_ID = "TIMECARD_GET_BY_ID";

const REF_TIMECARD = "REF_TIMECARD";

// ACTIONS :: COmponents are interacting with this action
export function addTimecardAction(payload) {
  // return { type: TIMECARD_ADD, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/timecard/${payload.employeeId}`;

    const requestBody = { ...payload };
    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: TIMECARD_ADD, payload: payload });
  };
}

export function updateTimecardAction(payload) {
  // return { type: TIMECARD_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/timecard/update/${payload.timeCardId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefTimecard({}));
  };
}

export function deleteTimecardAction(payload) {
  // return { type: TIMECARD_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/timecard/delete/${payload.timeCardId}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllTimecardAction());
  };
}

export function getAllTimecardAction(payload) {
  // return { type: TIMECARD_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/timecard/all";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const timecardList = await response.json();
    console.log(timecardList);

    // Update the UI
    dispatch({ type: TIMECARD_GET_ALL, payload: timecardList });
  };
}

export function getByIdTimecardAction(payload) {
  // return { type: Attendance_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/timecard/${payload.timeCardId}`;
    const response = await fetch(url);
    const timecardObj = await response.json();

    // this wil update the reftc
    dispatch(updateRefTimecard(timecardObj));
  };
}

export function updateRefTimecard(payload) {
  return { type: REF_TIMECARD, payload: payload };
}

// REDUCER LOGIC
export function TimecardReducer(state = initState, action) {
  switch (action.type) {
    case TIMECARD_ADD:
      return { ...state, list: [action.payload, ...state.list] };
    case TIMECARD_UPDATE:
      // TODO
      return state;
    case TIMECARD_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case TIMECARD_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case TIMECARD_GET_BY_ID:
      // TODO
      return state;

    case REF_TIMECARD:
      return { ...state, reftc: action.payload };

    default:
      return state;
  }
}
