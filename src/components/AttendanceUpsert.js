import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addAttendanceAction,
  updateAttendanceAction,
} from "../redux/AttendanceReducer";

export function AttendanceUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [employee, setEmployee] = useState(state.attendance.refatt.employee);
  const [inTime, setInTime] = useState(state.attendance.refatt.inTime);
  const [offTime, setOffTime] = useState(state.attendance.refatt.offTime);
  const [fromDate, setFromDate] = useState(state.attendance.refatt.fromDate);
  const [toDate, setToDate] = useState(state.attendance.refatt.toDate);
  const [status, setStatus] = useState(state.attendance.refatt.status);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployee = (e) => setEmployee(e.target.value);
  const updateInTime = (e) => setInTime(e.target.value);
  const updateOffTime = (e) => setOffTime(e.target.value);
  const updateFromDate = (e) => setFromDate(e.target.value);
  const updateToDate = (e) => setToDate(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const addAttendance = (e) => {
    e.preventDefault();
    console.log(employee, inTime, offTime, fromDate, toDate, status);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      addAttendanceAction({
        employee,
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
    setEmployee("");
    setInTime("");
    setOffTime("");
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  const updateAttendance = () => {
    dispatch(
      updateAttendanceAction({
        attendanceId: state.attendance.refatt.attendanceId,
        employee,
        inTime,
        offTime,
        fromDate,
        toDate,
        status,
      })
    );

    // reset the form
    setEmployee("");
    setInTime("");
    setOffTime("");
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.attendance.refatt.attendanceId
            ? "Update Employee"
            : "Add Employee"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Opeation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={employee}
            onChange={(e) => updateEmployee(e)}
            className="form-control"
            placeholder="Enter Employee ID"
          />
        </div>

        <div className="mb-1">
          <input
            type="time"
            value={inTime}
            onChange={(e) => updateInTime(e)}
            className="form-control"
            placeholder="Enter In Time"
          />
        </div>

        <div className="mb-1">
          <input
            type="time"
            value={offTime}
            onChange={(e) => updateOffTime(e)}
            className="form-control"
            placeholder="Enter Off Time"
          />
        </div>

        <div className="mb-1">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => updateFromDate(e)}
            className="form-control"
            placeholder="Enter From Date"
          />
        </div>

        <div className="mb-1">
          <input
            type="date"
            value={toDate}
            onChange={(e) => updateToDate(e)}
            className="form-control"
            placeholder="Enter To Date"
          />
        </div>
        <div className="mb-1">
          <input
            type="status"
            value={status}
            onChange={(e) => updateStatus(e)}
            className="form-control"
            placeholder="Enter Status"
          />
        </div>

        <div className="mb-1">
          {state.attendance.refatt.attendanceId ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Attendance"
              onClick={() => updateAttendance()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Attendance"
              onClick={(e) => addAttendance(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
