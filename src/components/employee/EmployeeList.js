import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteEmployeeAction,
  getAllEmployeeAction,
  getByIdEmployeeAction,
  updateRefEmployee,
} from "../../redux/EmployeeReducer";
import { EmployeeModal } from "./EmployeeModal";

export function EmployeeList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllEmployeeAction());
  }, []);

  const deleteEmployee = (item, index) => {
    dispatch(deleteEmployeeAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updateEmployee = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefEmployee(item));

    // form page
    history.push("/create-employee");
  };

  const getEmployeeById = (item) => {
    dispatch(getByIdEmployeeAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-primary text-secondary">Employee List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">EMPLOYEE-ID</th>
                <th scope="col">EMPLOYEE-NAME</th>
                <th scope="col">EMPLOYEE-ROLE</th>
                <th scope="col">EMPLOYEE-EMAIL</th>
                <th scope="col">PHONE-NUMBER</th>
                <th scope="col">USER-ID</th>
                <th scope="col">PASSWORD</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.employee.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.employeeId}</th>
                  <td>{item.employeeName}</td>
                  <td>{item.employeeRole}</td>
                  <td>{"****@gmail.com"}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.userId}</td>
                  <td>{"********"}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getEmployeeById(item, index)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updateEmployee(item, index)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deleteEmployee(item, index)}
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

      {/** EMPLOYEE MODAL */}
      <EmployeeModal />
    </>
  );
}
