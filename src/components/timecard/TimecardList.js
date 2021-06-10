import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteTimecardAction,
  getAllTimecardAction,
  getByIdTimecardAction,
  updateRefTimecard,
} from "../../redux/TimecardReducer";
import { TimecardModal } from "./TimecardModal";

export function TimecardList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllTimecardAction());
  }, []);

  const deleteTimecard = (item, index) => {
    dispatch(deleteTimecardAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateTimecard = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefTimecard(item));

    // form page
    history.push("/add-timecard");
  };

  const getTimecardById = (item) => {
    dispatch(getByIdTimecardAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-primary text-secondary">Timecard List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">TIMECARD-ID</th>
                <th scope="col">EMPLOYEE-ID</th>
                <th scope="col">ENTRY-DATE</th>
                <th scope="col">TIME-ENTRY</th>
                <th scope="col">TIME-EXIT</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...state.timecard.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.timeCardId}</th>
                  <td>{item.employee.employeeId}</td>
                  <td>{item.date}</td>
                  <td>{item.timeEntry}</td>
                  <td>{item.timeExit}</td>
                  <td>{item.status}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getTimecardById(item, index)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateTimecard(item, index)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteTimecard(item, index)}
                      className="btn btn-link text-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3 col-md-2 d-none d-md-block"></div>
      </div>

      {/** Timecard MODAL */}
      <TimecardModal />
    </>
  );
}
