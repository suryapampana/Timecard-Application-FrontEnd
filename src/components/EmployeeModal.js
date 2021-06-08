import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefEmployee } from "../redux/EmployeeReducer";

export function EmployeeModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefEmployee({}));
  };

  return (
    <Modal
      show={state.employee.refemp.employeeId}
      onHide={() => updateRefObj()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Hello, {state.employee.refemp.employeeName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            EMPLOYEE NAME - {state.employee.refemp.employeeName}
          </ListGroup.Item>
          <ListGroup.Item>
            EMPLOYEE ROLE - {state.employee.refemp.employeeRole}
          </ListGroup.Item>
          <ListGroup.Item>EMPLOYEE EMAIL - {"******@gmail.com"}</ListGroup.Item>
          <ListGroup.Item>
            PHONE NUMBER - {state.employee.refemp.phoneNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            USER ID - {state.employee.refemp.userId}
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
