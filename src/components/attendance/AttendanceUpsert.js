import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addAttendanceAction,
  updateAttendanceAction,
} from "../../redux/AttendanceReducer";

export function AttendanceUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [employeeId, setEmployeeId] = useState(
    state.attendance.refatt.employeeId
  );
  const [inTime, setInTime] = useState(state.attendance.refatt.inTime);
  const [offTime, setOffTime] = useState(state.attendance.refatt.offTime);
  const [fromDate, setFromDate] = useState(state.attendance.refatt.fromDate);
  const [toDate, setToDate] = useState(state.attendance.refatt.toDate);
  const [status, setStatus] = useState(state.attendance.refatt.status);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployeeId = (e) => setEmployeeId(e.target.value);
  const updateInTime = (e) => setInTime(e.target.value);
  const updateOffTime = (e) => setOffTime(e.target.value);
  const updateFromDate = (e) => setFromDate(e.target.value);
  const updateToDate = (e) => setToDate(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const addAttendance = (e) => {
    e.preventDefault();
    console.log(employeeId, inTime, offTime, fromDate, toDate, status);

    console.log(formEL);
    console.log(formEL.current.checkValidity());

    if (formEL.current.checkValidity() === false) {
      // hanlde the false case
      e.preventDefault();
      e.stopPropagation();
      formEL.current.classList.add("was-validated");
    } else {
      // you can write custom valiadation logic here.
      // username :: Speical Character validation
      const re = /^[a-z0-9_\.]+$/;
      if (!re.test(employeeId)) {
        alert("Username Vlidation Fails");
        return;
      }
      // THIS IS REDUX ACTION CALLING
      dispatch(
        addAttendanceAction({
          employeeId,
          inTime,
          offTime,
          fromDate,
          toDate,
          status,
        })
      );

      // A1 sucess
      setSuccessOperation(true);
      setTimeout(() => setSuccessOperation(false), 5000);

      // A2: navigate to another page
      // history.push("/list-employee");

      // reset the form
      setEmployeeId("");
      setInTime("");
      setOffTime("");
      setFromDate("");
      setToDate("");
      setStatus("");
    }
  };

  const updateAttendance = () => {
    dispatch(
      updateAttendanceAction({
        attendanceId: state.attendance.refatt.attendanceId,
        employeeId,
        inTime,
        offTime,
        fromDate,
        toDate,
        status,
      })
    );

    // reset the form
    setEmployeeId("");
    setInTime("");
    setOffTime("");
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-secondary">
            {state.attendance.refatt.attendanceId
              ? "Update Attendance"
              : "Add Attendance"}
          </h3>

          {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
          {successOperation && (
            <div className="alert alert-success">Attendance Added</div>
          )}

          <div className="card-body"></div>
          <form ref={formEL} className="needs-validation" noValidate>
            <div className="mb-1 form-group">
              <label> Employee Id: </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => updateEmployeeId(e)}
                className="form-control"
                placeholder="Enter Employee ID"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> In-Time: </label>
              <input
                type="time"
                value={inTime}
                onChange={(e) => updateInTime(e)}
                className="form-control"
                placeholder="Enter In Time"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Off-Time: </label>
              <input
                type="time"
                value={offTime}
                onChange={(e) => updateOffTime(e)}
                className="form-control"
                placeholder="Enter Off Time"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> From-Date: </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => updateFromDate(e)}
                className="form-control"
                placeholder="Enter From Date"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> To-Date: </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => updateToDate(e)}
                className="form-control"
                placeholder="Enter To Date"
                required={true}
              />
            </div>

            <div className="mb-1">
              {state.attendance.refatt.attendanceId ? (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Update Attendance"
                  onClick={() => updateAttendance()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Add Attendance"
                  onClick={(e) => addAttendance(e)}
                />
              )}
            </div>
          </form>
        </div>
        <div className="col-3 col-md-3  d-none d-md-block"></div>
      </div>
    </div>
  );
}
