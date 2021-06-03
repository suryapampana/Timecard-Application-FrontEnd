import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AppNavBar() {
  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="light"
      className="navbar sticky-top "
    >
      <Navbar.Brand as={Link} to="/" className="text-white">
        TIME SHEET MANAGEMENT
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
      <Navbar.Collapse id="basic-navbar-nav" className="bg-white rounded m-2">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/create-employee"
            className="text-primary pl-2"
          >
            Create Employee
          </Nav.Link>
          <Nav.Link as={Link} to="/list-employee" className="text-primary pl-2">
            List Employee
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
