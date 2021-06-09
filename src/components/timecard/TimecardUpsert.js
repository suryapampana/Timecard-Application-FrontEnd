import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addTimecardAction,
  updateTimecardAction,
} from "../../redux/TimecardReducer";

export function TimecardUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [employeeId, setEmployeeId] = useState(state.timecard.reftc.employeeId);
  const [date, setDate] = useState(state.timecard.reftc.date);
  const [timeEntry, setTimeEntry] = useState(state.timecard.reftc.timeEntry);
  const [timeExit, setTimeExit] = useState(state.timecard.reftc.timeExit);
  const [status, setStatus] = useState(state.attendance.refatt.status);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployeeId = (e) => setEmployeeId(e.target.value);
  const updateDate = (e) => setDate(e.target.value);
  const updateTimeEntry = (e) => setTimeEntry(e.target.value);
  const updateTimeExit = (e) => setTimeExit(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const addTimecard = (e) => {
    e.preventDefault();
    console.log(employeeId, date, timeEntry, timeExit, status);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      addTimecardAction({
        employeeId,
        date,
        timeEntry,
        timeExit,
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
    setDate("");
    setTimeEntry("");
    setTimeExit("");
    setStatus("");
  };

  const updateTimecard = () => {
    dispatch(
      updateTimecardAction({
        attendanceId: state.timecard.reftc.timeCardId,
        employeeId,
        date,
        timeEntry,
        timeExit,
        status,
      })
    );

    // reset the form
    setEmployeeId("");
    setDate("");
    setTimeEntry("");
    setTimeExit("");
    setStatus("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-secondary">
            {state.timecard.reftc.timeCardId
              ? "Update Timecard"
              : "Add Timecard"}
          </h3>

          {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
          {successOperation && (
            <div className="alert alert-success">TimeCard Added</div>
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
              <label> Date: </label>
              <input
                type="date"
                value={date}
                onChange={(e) => updateDate(e)}
                className="form-control"
                placeholder="Enter Date"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Entry-Time: </label>
              <input
                type="time"
                value={timeEntry}
                onChange={(e) => updateTimeEntry(e)}
                className="form-control"
                placeholder="Enter Time Entry"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Exit-Time: </label>
              <input
                type="time"
                value={timeExit}
                onChange={(e) => updateTimeExit(e)}
                className="form-control"
                placeholder="Enter Time Exit"
                required={true}
              />
            </div>

            <div className="mb-1">
              {state.timecard.reftc.timeCardId ? (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Update Timecard"
                  onClick={() => updateTimecard()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Add Timecard"
                  onClick={(e) => addTimecard(e)}
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
