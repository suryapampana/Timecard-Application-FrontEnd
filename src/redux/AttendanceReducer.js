const initState = {
  list: [],

  refatt: {},
  sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai", "Agra", "Bamgalore"],
};

// ACTION TYPES
const ATTENDANCE_ADD = "ATTENDANCE_ADD";
const ATTENDANCE_UPDATE = "ATTENDANCE_UPDATE";
const ATTENDANCE_DELETE = "ATTENDANCE_DELETE";
const ATTENDANCE_GET_ALL = "ATTENDANCE_GET_ALL";
const ATTENDANCE_GET_BY_ID = "ATTENDANCE_GET_BY_ID";

const REF_ATTENDANCE = "REF_ATTENDANCE";

// ACTIONS :: COmponents are interacting with this action
export function addAttendanceAction(payload) {
  // return { type: ATTENDANCE_ADD, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/attendance/employee.id";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: ATTENDANCE_ADD, payload: payload });
  };
}

export function updateAttendanceAction(payload) {
  // return { type: ATTENDANCE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/attendance/${payload.attendanceId}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefAttendance({}));
  };
}

export function deleteAttendanceAction(payload) {
  // return { type: ATTENDANCE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/attendance/${payload.attendanceId}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllAttendanceAction());
  };
}

export function getAllAttendanceAction(payload) {
  // return { type: ATTENDANCE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/attendance/";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const attendanceList = await response.json();
    console.log(attendanceList);

    // Update the UI
    dispatch({ type: ATTENDANCE_GET_ALL, payload: attendanceList });
  };
}

export function getByIdAttendanceAction(payload) {
  // return { type: Attendance_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/attendance/${payload.attendanceId}`;
    const response = await fetch(url);
    const attendanceObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefAttendance(attendanceObj));
  };
}

export function updateRefAttendance(payload) {
  return { type: REF_ATTENDANCE, payload: payload };
}

// REDUCER LOGIC
export function AttendanceReducer(state = initState, action) {
  switch (action.type) {
    case ATTENDANCE_ADD:
      return { ...state, list: [action.payload, ...state.list] };
    case ATTENDANCE_UPDATE:
      // TODO
      return state;
    case ATTENDANCE_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case ATTENDANCE_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case ATTENDANCE_GET_BY_ID:
      // TODO
      return state;

    case REF_ATTENDANCE:
      return { ...state, refatt: action.payload };

    default:
      return state;
  }
}
