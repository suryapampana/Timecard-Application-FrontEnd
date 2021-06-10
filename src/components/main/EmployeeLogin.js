import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EmployeeLoginAction } from "../../redux/EmployeeLoginReducer";

export const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);

  const [employeeEmail, setEmployeeEmail] = useState(
    state.employee.refemp.employeeEmail
  );
  const [password, setPassword] = useState(state.employee.refemp.password);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateEmployeeEmail = (e) => setEmployeeEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const EmployeeLoginFunction = () => {
    dispatch(
      EmployeeLoginAction({
        employeeEmail,
        password,
      })
    );

    setErrorOperation(true);
    setTimeout(() => setErrorOperation(false), 5000);

    console.log(employeeEmail, password);
  };

  if (state.employeeLogin.loginAction === true) {
    history.push("/employee-dashboard");
  }
  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-primary text-center text-secondary mt-2">
          Employee Login
        </h3>

        {state.employeeLogin.loginAction === false && errorOperation && (
          <div className="alert alert-danger">login failure</div>
        )}

        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            value={employeeEmail}
            onChange={(e) => updateEmployeeEmail(e)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => updatePassword(e)}
          />
        </div>

        <div>
          <Button
            className="bttn btn-success "
            onClick={() => EmployeeLoginFunction()}
          >
            LogIn
          </Button>
        </div>
        <div>
          <Button
            className="bttn btn-success  mt-2"
            as={Link}
            to="/create-employee"
            onClick={() => history.push("/create-employee")}
          >
            Register Here
          </Button>
        </div>
      </div>
      <div className="col-3 col-md-4 d-none d-md-block"></div>
    </div>
  );
};
