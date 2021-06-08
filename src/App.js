import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AttendanceUpsert } from "./components/AttendanceUpsert";
import { AttendanceList } from "./components/AttendanceList";
import { EmployeeUpsert } from "./components/EmployeeUpsert";
import { EmployeeList } from "./components/EmployeeList";
import { LeaveUpsert } from "./components/LeaveUpsert";
import { LeaveList } from "./components/LeaveList";

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
