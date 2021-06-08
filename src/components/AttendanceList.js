import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteAttendanceAction,
  getAllAttendanceAction,
  getByIdAttendanceAction,
  updateRefAttendance,
} from "../redux/AttendanceReducer";
import { AttendanceModal } from "./AttendanceModal";

export function AttendanceList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllAttendanceAction());
  }, []);

  const deleteAttendance = (item, index) => {
    dispatch(deleteAttendanceAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateAttendance = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefAttendance(item));

    // form page
    history.push("/add-attendance");
  };

  const getAttendanceById = (item) => {
    dispatch(getByIdAttendanceAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Attendance List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#Attendance-ID</th>
                <th scope="col">EMPLOYEE-ID</th>
                <th scope="col">IN-TIME</th>
                <th scope="col">OFF-TIME</th>
                <th scope="col">FROM-DATE</th>
                <th scope="col">TO-DATE</th>
                <th scope="col">STATUS</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.attendance.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.attendanceId}</th>
                  <td>{item.employee}</td>
                  <td>{item.inTime}</td>
                  <td>{item.offTime}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.status}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getAttendanceById(item, index)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateAttendance(item, index)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteAttendance(item, index)}
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

      {/** Attendance MODAL */}
      <AttendanceModal />
    </>
  );
}
