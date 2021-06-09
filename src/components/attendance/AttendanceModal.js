import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefAttendance } from "../../redux/AttendanceReducer";

export function AttendanceModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefAttendance({}));
  };

  return (
    <Modal
      show={state.attendance.refatt.attendanceId}
      onHide={() => updateRefObj()}
    >
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
          <ListGroup.Item>
            IN TIME - {state.attendance.refatt.inTime}
          </ListGroup.Item>
          <ListGroup.Item>
            OFF TIME - {state.attendance.refatt.offTime}
          </ListGroup.Item>
          <ListGroup.Item>
            FROM DATE - {state.attendance.refatt.fromDate}
          </ListGroup.Item>
          <ListGroup.Item>
            TO DATE - {state.attendance.refatt.toDate}
          </ListGroup.Item>
          <ListGroup.Item>
            STATUS - {state.attendance.refatt.status}
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
