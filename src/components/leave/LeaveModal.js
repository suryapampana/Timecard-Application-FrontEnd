import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefLeave } from "../../redux/LeaveReducer";

export function LeaveModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefLeave({}));
  };

  return (
    <Modal show={state.leave.reflev.leaveId} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title>Hello, {state.leave.reflev.employeeId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            Employee Id - {state.leave.reflev.employeeId}
          </ListGroup.Item>
          <ListGroup.Item>
            From Date - {state.leave.reflev.fromDate}
          </ListGroup.Item>
          <ListGroup.Item>To Date - {state.leave.reflev.toDate}</ListGroup.Item>
          <ListGroup.Item>Status - {state.leave.reflev.status}</ListGroup.Item>
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
