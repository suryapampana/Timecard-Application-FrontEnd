import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefSupervisor } from "../../redux/SupervisorReducer";

export function SupervisorModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefSupervisor({}));
  };

  return (
    <Modal
      show={state.supervisor.refsup.supervisorId}
      onHide={() => updateRefObj()}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Hello, {state.supervisor.refsup.supervisorName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            SUPERVISOR NAME - {state.supervisor.refsup.supervisorName}
          </ListGroup.Item>

          <ListGroup.Item>
            SUPERVISOR EMAIL - {"******@gmail.com"}
          </ListGroup.Item>
          <ListGroup.Item>
            SUPERVISOR NUMBER - {state.supervisor.refsup.supervisorNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            USER ID - {state.supervisor.refsup.userId}
          </ListGroup.Item>
          <ListGroup.Item>PASSWORD - {"*********"}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
