import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { applyLeaveAction, updateLeaveAction } from "../../redux/LeaveReducer";

export function LeaveUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
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
    //history.push("/list-leave");

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
    <div className="container">
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-secondary mb-1">
            {state.leave.reflev.leaveId ? "Update Leave" : "Apply Leave"}
          </h3>

          {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
          {successOperation && (
            <div className="alert alert-success">Leave Added</div>
          )}

          <div className="card-body"></div>
          <form ref={formEL} className="needs-validation" noValidate>
            <div className="mb-1 from-group">
              <label> Employee Id: </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => updateEmployeeId(e)}
                className="form-control"
                placeholder="Enter Employee Id"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> From-Date: </label>
              <label htmlFor="validationCustom02" className="text-secondary">
                From-Date
              </label>
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
              <label htmlFor="validationCustom02" className="text-secondary">
                To-Date
              </label>
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
              {state.leave.reflev.leaveId ? (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Update Leave"
                  onClick={() => updateLeave()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Apply Leave"
                  onClick={(e) => applyLeave(e)}
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
