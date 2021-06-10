import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createSupervisorAction,
  updateSupervisorAction,
} from "../../redux/SupervisorReducer";

export function SupervisorUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [supervisorName, setSupervisorName] = useState(
    state.supervisor.refsup.supervisorName
  );
  const [supervisorEmail, setSupervisorEmail] = useState(
    state.supervisor.refsup.supervisorEmail
  );
  const [supervisorNumber, setSupervisorNumber] = useState(
    state.supervisor.refsup.supervisorNumber
  );
  const [userId, setUserId] = useState(state.supervisor.refsup.userId);
  const [password, setPassword] = useState(state.supervisor.refsup.password);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateSupervisorName = (e) => setSupervisorName(e.target.value);
  const updateSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
  const updateSupervisorNumber = (e) => setSupervisorNumber(e.target.value);
  const updateUserId = (e) => setUserId(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const addSupervisor = (e) => {
    e.preventDefault();
    console.log(
      supervisorName,
      supervisorEmail,
      supervisorNumber,
      userId,
      password
    );

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
      const re = /^[a-z0-9_\.]+$/;
      if (!re.test(userId)) {
        alert("Username Vlidation Fails");
        return;
      }

      // THIS IS REDUX ACTION CALLING
      dispatch(
        createSupervisorAction({
          supervisorName,
          supervisorEmail,
          supervisorNumber,
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
      setSupervisorName("");
      setSupervisorEmail("");
      setSupervisorNumber("");
      setUserId("");
      setPassword("");
    }
  };

  const updateSupervisor = () => {
    dispatch(
      updateSupervisorAction({
        supervisorId: state.supervisor.refsup.supervisorId,
        supervisorName,
        supervisorEmail,
        supervisorNumber,
        userId,
        password,
      })
    );

    // reset the form
    setSupervisorName("");
    setSupervisorEmail("");
    setSupervisorNumber("");
    setUserId("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-secondary">
            {state.supervisor.refsup.supervisorId
              ? "Update Supervisor"
              : "Create Supervisor"}
          </h3>

          {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
          {successOperation && (
            <div className="alert alert-success">Supervisor Created</div>
          )}

          <div className="card-body"></div>
          <form ref={formEL} className="needs-validation" noValidate>
            <div className="mb-1 form-group">
              <label> Supervisor Name: </label>
              <input
                type="text"
                value={supervisorName}
                onChange={(e) => updateSupervisorName(e)}
                className="form-control"
                placeholder="Enter Supervisor Name"
                required={true}
                minLength="3"
                maxLength="15"
              />
            </div>

            <div className="mb-1 form-group">
              <label> Supervisor Email: </label>
              <input
                type="email"
                value={supervisorEmail}
                onChange={(e) => updateSupervisorEmail(e)}
                className="form-control"
                placeholder="Enter Email"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> Supervisor MobileNumber: </label>
              <input
                type="number"
                value={supervisorNumber}
                onChange={(e) => updateSupervisorNumber(e)}
                className="form-control"
                placeholder="Enter Mobile"
                max="9999999999"
                required={true}
              />
            </div>

            <div className="mb-1 form-group">
              <label> UserId: </label>
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
              />
            </div>

            <div className="mb-1">
              {state.supervisor.refsup.supervisorId ? (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Update Supervisor"
                  onClick={() => updateSupervisor()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-success w-100"
                  value="Add Supervisor"
                  onClick={(e) => addSupervisor(e)}
                />
              )}
            </div>

            <div>
              <Button
                className="bttn btn-success  mt-2 w-100"
                as={Link}
                to="/supervisor-login"
                onClick={() => history.push("/supervisor-login")}
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
