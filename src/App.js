import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AttendanceUpsert } from "./components/attendance/AttendanceUpsert";
import { AttendanceList } from "./components/attendance/AttendanceList";
import { EmployeeUpsert } from "./components/employee/EmployeeUpsert";
import { EmployeeList } from "./components/employee/EmployeeList";
import { LeaveUpsert } from "./components/leave/LeaveUpsert";
import { LeaveList } from "./components/leave/LeaveList";

import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";

function App() {
  return (
    <Router>
      <AppNavBar />

      <Switch>
        <Route path="/create-employee">
          <EmployeeUpsert />
        </Route>

        <Route path="/list-employee">
          <EmployeeList />
        </Route>

        <Route path="/add-attendance">
          <AttendanceUpsert />
        </Route>

        <Route path="/list-attendance">
          <AttendanceList />
        </Route>

        <Route path="/apply-leave">
          <LeaveUpsert />
        </Route>

        <Route path="/list-leave">
          <LeaveList />
        </Route>

        <Route exact path="/">
          <EmployeeList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
