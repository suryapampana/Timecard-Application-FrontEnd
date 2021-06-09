import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteSupervisorAction,
  getAllSupervisorAction,
  getByIdSupervisorAction,
  updateRefSupervisor,
} from "../../redux/SupervisorReducer";
import { SupervisorModal } from "./SupervisorModal";

export function SupervisorList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllSupervisorAction());
  }, []);

  const deleteSupervisor = (item, index) => {
    dispatch(deleteSupervisorAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateSupervisor = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefSupervisor(item));

    // form page
    history.push("/create-supervisor");
  };

  const getSupervisorById = (item) => {
    dispatch(getByIdSupervisorAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-primary text-secondary">
            Supervisor List
          </h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SUPERVISOR-ID</th>
                <th scope="col">SUPERVISOR-NAME</th>
                <th scope="col">SUPERVISOR-EMAIL</th>
                <th scope="col">SUPERVISOR-NUMBER</th>
                <th scope="col">USER-ID</th>
                <th scope="col">PASSWORD</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.supervisor.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.supervisorId}</th>
                  <td>{item.supervisorName}</td>
                  <td>{"****@gmail.com"}</td>
                  <td>{item.supervisorNumber}</td>
                  <td>{item.userId}</td>
                  <td>{"********"}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getSupervisorById(item, index)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateSupervisor(item, index)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteSupervisor(item, index)}
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

      {/** SUPERVISOR MODAL */}
      <SupervisorModal />
    </>
  );
}
