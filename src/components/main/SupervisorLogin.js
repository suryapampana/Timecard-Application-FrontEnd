import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SupervisorLoginAction } from "../../redux/SupervisorLoginReducer";

export const SupervisorLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);

  const [supervisorEmail, setSupervisorEmail] = useState(
    state.supervisor.refsup.supervisorEmail
  );
  const [password, setPassword] = useState(state.supervisor.refsup.password);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const SupervisorLoginFunction = () => {
    dispatch(
      SupervisorLoginAction({
        supervisorEmail,
        password,
      })
    );

    setErrorOperation(true);
    setTimeout(() => setErrorOperation(false), 5000);

    console.log(supervisorEmail, password);
  };

  if (state.supervisorLogin.loginAction === true) {
    history.push("/supervisor-dashboard");
  }
  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-primary text-center text-secondary mt-2">
          Supervisor Login
        </h3>

        {state.supervisorLogin.loginAction === false && errorOperation && (
          <div className="alert alert-danger">login failure</div>
        )}

        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            value={supervisorEmail}
            onChange={(e) => updateSupervisorEmail(e)}
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
            onClick={() => SupervisorLoginFunction()}
          >
            LogIn
          </Button>
        </div>
        <div>
          <Button
            className="bttn btn-success  mt-2"
            as={Link}
            to="/create-supervisor"
            onClick={() => history.push("/create-supervisor")}
          >
            Register Here
          </Button>
        </div>
      </div>
      <div className="col-3 col-md-4 d-none d-md-block"></div>
    </div>
  );
};
