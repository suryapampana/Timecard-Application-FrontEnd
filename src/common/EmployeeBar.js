import { Carousel, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export function EmployeeBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="navbar sticky-top ">
      <Navbar.Brand as={Link} to="/employee-dashboard" className="text-white">
        Employee Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/list-employee">
            <Nav.Link href="#listemployee">Employee List</Nav.Link>
          </Link>

          <Link to="/list-supervisor">
            <Nav.Link href="#listsupervisor">SupervisorList</Nav.Link>
          </Link>

          <NavDropdown
            title="Leave"
            id="nav-dropdown"
            className="color-primary"
          >
            <NavDropdown.Item
              eventKey="4.1"
              as={Link}
              to="/apply-leave"
              className="pl-2"
              style={{ color: "tomato" }}
            >
              Apply Leave
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="4.2"
              as={Link}
              to="/list-leave"
              className="pl-2"
            >
              Leave List
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>

          <NavDropdown
            title="Attendance"
            id="nav-dropdown"
            className="color-primary"
          >
            <NavDropdown.Item
              eventKey="4.1"
              as={Link}
              to="/add-attendance"
              className="pl-2"
              style={{ color: "tomato" }}
            >
              Add Attendance
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="4.2"
              as={Link}
              to="/list-attendance"
              className="pl-2"
            >
              Attendance List
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>

          <NavDropdown
            title="Timecard"
            id="nav-dropdown"
            className="color-primary"
          >
            <NavDropdown.Item
              eventKey="4.1"
              as={Link}
              to="/add-timecard"
              className="pl-2"
              style={{ color: "tomato" }}
            >
              Add TimeCard
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="4.2"
              as={Link}
              to="/list-timecard"
              className="pl-2"
            >
              TimeCard List
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>

          <Link to="/start-up">
            <Nav.Link className="text-danger" href="#startup">
              Sign Out
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
