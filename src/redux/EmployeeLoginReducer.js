const initState = {
  list: [],
  // will display the proper login page
  loginAction: false,
};

// ACTION TYPES
const LOGIN_ACTION = "LOGIN_ACTION";

// ACTIONS :: Login Action
export function EmployeeLoginAction(payload) {
  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    try {
      const url = "http://localhost:8080/api/employee/login";
      const requestBody = { ...payload };

      // HTTP Client
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const user = await response.json();
      sessionStorage.setItem("user", JSON.stringify(user));

      if (user) {
        // UPDATE THE UI
        dispatch({ type: LOGIN_ACTION, payload: payload });
      } else {
        //
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// REDUCER LOGIC
export function EmployeeLoginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, loginAction: true };
    default:
      return state;
  }
}
