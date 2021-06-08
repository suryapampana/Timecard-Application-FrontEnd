import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { applyLeaveAction, updateLeaveAction } from "../redux/LeaveReducer";

export function LeaveUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [employeeId, setEmployeeId] = useState(state.leave.reflev.employeeId);
  const [fromDate, setFromDate] = useState(state.leave.reflev.fromDate);
  const [toDate, setToDate] = useState(state.leave.reflev.toDate);
  const [status, setStatus] = useState(state.leave.reflev.status);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployeeId = (e) => setEmployeeId(e.target.value);
  const updateFromDate = (e) => setFromDate(e.target.value);
  const updateToDate = (e) => setToDate(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const applyLeave = (e) => {
    e.preventDefault();
    console.log(employeeId, fromDate, toDate, status);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      applyLeaveAction({
        employeeId,
        toDate,
        fromDate,
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
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  const updateLeave = () => {
    dispatch(
      updateLeaveAction({
        leaveId: state.leave.reflev.leaveId,
        employeeId,
        fromDate,
        toDate,
        status,
      })
    );

    // reset the form
    setEmployeeId("");
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.leave.reflev.leaveId ? "Update Leave" : "Apply Leave"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Opeation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={employeeId}
            onChange={(e) => updateEmployeeId(e)}
            className="form-control"
            placeholder="Enter Employee Id"
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
          {state.leave.reflev.leaveId ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Leave"
              onClick={() => updateLeave()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Apply Leave"
              onClick={(e) => applyLeave(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
