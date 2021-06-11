import { Button } from "react-bootstrap";
import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "../../redux/EmployeeReducer";

export function EmployeeUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [employeeName, setEmployeeName] = useState(
    state.employee.refemp.employeeName
  );
  const [employeeRole, setEmployeeRole] = useState(
    state.employee.refemp.employeeRole
  );
  const [employeeEmail, setEmployeeEmail] = useState(
    state.employee.refemp.employeeEmail
  );
  const [phoneNumber, setPhoneNumber] = useState(
    state.employee.refemp.phoneNumber
  );
  const [userId, setUserId] = useState(state.employee.refemp.userId);
  const [password, setPassword] = useState(state.employee.refemp.password);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployeeName = (e) => setEmployeeName(e.target.value);
  const updateEmployeeRole = (e) => setEmployeeRole(e.target.value);
  const updateEmployeeEmail = (e) => setEmployeeEmail(e.target.value);
  const updatePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const updateUserId = (e) => setUserId(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const addEmployee = (e) => {
    e.preventDefault();
    console.log(
      employeeName,
      employeeRole,
      employeeEmail,
      phoneNumber,
      userId,
      password
    );
    // logs u can remove next three lines
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
      const re = /^[A-Za-z0-9_\.]+$/;
      if (!re.test(userId)) {
        alert("Username Vlidation Fails");
        return;
      }

      // THIS IS REDUX ACTION CALLING
      dispatch(
        createEmployeeAction({
          employeeName,
          employeeRole,
          employeeEmail,
          phoneNumber,
          userId,
          password,
        })
      );

      // A1 sucess
      setSuccessOperation(true);
      setTimeout(() => setSuccessOperation(false), 5000);

      // A2: navigate to another page
      // history.push("/list-employee");

      // reset the form
      setEmployeeName("");
      setEmployeeRole("");
      setEmployeeEmail("");
      setPhoneNumber("");
      setUserId("");
      setPassword("");
    }
  };

  const updateEmployee = () => {
    dispatch(
      updateEmployeeAction({
        employeeId: state.employee.refemp.employeeId,
        employeeName,
        employeeRole,
        employeeEmail,
        phoneNumber,
        userId,
        password,
      })
    );

    // reset the form
    setEmployeeName("");
    setEmployeeRole("");
    setEmployeeEmail("");
    setPhoneNumber("");
    setUserId("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-secondary mb-1">
            {state.employee.refemp.employeeId
              ? "Update Employee"
              : "Create Employee"}
          </h3>

          {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
          {successOperation && (
            <div className="alert alert-success">Employee Created</div>
          )}

          <div className="card-body"></div>

          <form ref={formEL} className="needs-validation" noValidate>
            <div className="mb-1 form-group">
              <label> Employee Name: </label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => updateEmployeeName(e)}
                className="form-control"
                placeholder="Enter Employee Name"
                required={true}
                minLength="3"
                maxLength="15"
              />
            </div>

            <div className="mb-1 form-group">
              <label> Employee Role: </label>
              <input
                placeholder="Employee Role"
                className="form-control"
                value={employeeRole}
                onChange={(e) => updateEmployeeRole(e)}
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Email Id: </label>
              <input
                type="email"
                value={employeeEmail}
                onChange={(e) => updateEmployeeEmail(e)}
                className="form-control"
                placeholder="Enter Email"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Mobile Number: </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => updatePhoneNumber(e)}
                className="form-control"
                placeholder="Enter Mobile"
                max="9999999999"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> User Id: </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => updateUserId(e)}
                className="form-control"
                placeholder="Enter UserId"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => updatePassword(e)}
                className="form-control"
                placeholder="Enter Password"
                required={true}
                minLength="8"
                maxLength="15"
              />
            </div>

            <div className="mb-1">
              {state.employee.refemp.employeeId ? (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Update Employee"
                  onClick={() => updateEmployee()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Add Employee"
                  onClick={(e) => addEmployee(e)}
                />
              )}
            </div>
            <div>
              <Button
                className="bttn btn-success  mt-2 w-100"
                as={Link}
                to="/employee-login"
                onClick={() => history.push("/employee-login")}
              >
                LogIn
              </Button>
            </div>
          </form>
        </div>
        <div className="col-3 col-md-3  d-none d-md-block"></div>
      </div>
    </div>
  );
}
