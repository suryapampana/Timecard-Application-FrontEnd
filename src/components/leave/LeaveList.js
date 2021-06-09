import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteLeaveAction,
  getAllLeaveAction,
  getByIdLeaveAction,
  updateRefLeave,
} from "../../redux/LeaveReducer";
import { LeaveModal } from "./LeaveModal";

export function LeaveList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllLeaveAction());
  }, []);

  const deleteLeave = (item, index) => {
    dispatch(deleteLeaveAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateLeave = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefLeave(item));

    // form page
    history.push("/apply-leave");
  };

  const getLeaveById = (item) => {
    dispatch(getByIdLeaveAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-primary text-secondary">Leave List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">LEAVE-ID</th>
                <th scope="col">EMPLOYEE-ID</th>
                <th scope="col">FROM-DATE</th>
                <th scope="col">TO-DATE</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...state.leave.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.leaveId}</th>
                  <td>{item.employeeId}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.status}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getLeaveById(item, index)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateLeave(item, index)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteLeave(item, index)}
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
      {/** LEAVE MODAL */}
      <LeaveModal />
    </>
  );
}
