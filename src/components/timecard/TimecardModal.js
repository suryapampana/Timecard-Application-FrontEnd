import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefTimecard } from "../../redux/TimecardReducer";

export function TimecardModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefTimecard({}));
  };

  return (
    <Modal show={state.timecard.reftc.timeCardId} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          Hello, {state.employee.refemp.employeeId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            EMPLOYEE ID - {state.employee.refemp.employeeId}
          </ListGroup.Item>
          <ListGroup.Item>DATE - {state.timecard.reftc.date}</ListGroup.Item>
          <ListGroup.Item>
            TIME ENTRY - {state.timecard.reftc.timeEntry}
          </ListGroup.Item>
          <ListGroup.Item>
            TIME EXIT - {state.timecard.reftc.timeExit}
          </ListGroup.Item>
          <ListGroup.Item>
            STATUS - {state.timecard.reftc.status}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
