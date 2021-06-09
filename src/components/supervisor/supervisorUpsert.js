import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createSupervisorAction,
  updateSupervisorAction,
} from "../../redux/SupervisorReducer";

export function SupervisorUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.supervisor.refsup.supervisorId
            ? "Update Supervisor"
            : "Create Supervisor"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Opeation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={supervisorName}
            onChange={(e) => updateSupervisorName(e)}
            className="form-control"
            placeholder="Enter Supervisor Name"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={supervisorEmail}
            onChange={(e) => updateSupervisorEmail(e)}
            className="form-control"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={supervisorNumber}
            onChange={(e) => updateSupervisorNumber(e)}
            className="form-control"
            placeholder="Enter Mobile"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={userId}
            onChange={(e) => updateUserId(e)}
            className="form-control"
            placeholder="Enter UserId"
          />
        </div>

        <div className="mb-1">
          <input
            type="password"
            value={password}
            onChange={(e) => updatePassword(e)}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div className="mb-1">
          {state.supervisor.refsup.supervisorId ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Supervisor"
              onClick={() => updateSupervisor()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Supervisor"
              onClick={(e) => addSupervisor(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
