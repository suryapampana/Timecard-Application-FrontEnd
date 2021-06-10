import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AttendanceUpsert } from "./components/attendance/AttendanceUpsert";
import { AttendanceList } from "./components/attendance/AttendanceList";
import { EmployeeUpsert } from "./components/employee/EmployeeUpsert";
import { EmployeeList } from "./components/employee/EmployeeList";
import { LeaveUpsert } from "./components/leave/LeaveUpsert";
import { LeaveList } from "./components/leave/LeaveList";
import { TimecardUpsert } from "./components/timecard/TimecardUpsert";
import { TimecardList } from "./components/timecard/TimecardList";
import { SupervisorUpsert } from "./components/supervisor/SupervisorUpsert";
import { SupervisorList } from "./components/supervisor/SupervisorList";

import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";
import Home from "./components/main/Home";
import Profile from "./components/main/Profile";
import { EmployeeDashboard } from "./components/main/EmployeeDashboard";
import { EmployeeBar } from "./common/EmployeeBar";
import { EmployeeLogin } from "./components/main/EmployeeLogin";
import { SupervisorLogin } from "./components/main/SupervisorLogin";
import { StartUp } from "./components/main/StartUp";
import { SupervisorDashboard } from "./components/main/SupervisorDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/employee-dashboard">
          <EmployeeBar />
          <EmployeeDashboard />
        </Route>

        <Route path="/supervisor-dashboard">
          <EmployeeBar />
          <SupervisorDashboard />
        </Route>

        <Route path="/home">
          <EmployeeBar />
          <Home />
        </Route>

        <Route path="/create-employee">
          <EmployeeUpsert />
        </Route>

        <Route path="/list-employee">
          <EmployeeBar />
          <EmployeeList />
        </Route>

        <Route path="/create-supervisor">
          <SupervisorUpsert />
        </Route>

        <Route path="/list-supervisor">
          <SupervisorList />
        </Route>

        <Route path="/add-attendance">
          <EmployeeBar />
          <AttendanceUpsert />
        </Route>

        <Route path="/list-attendance">
          <EmployeeBar />
          <AttendanceList />
        </Route>

        <Route path="/apply-leave">
          <EmployeeBar />
          <LeaveUpsert />
        </Route>

        <Route path="/list-leave">
          <EmployeeBar />
          <LeaveList />
        </Route>

        <Route path="/add-timecard">
          <EmployeeBar />
          <TimecardUpsert />
        </Route>

        <Route path="/list-timecard">
          <EmployeeBar />
          <TimecardList />
        </Route>

        <Route path="/profile/:id" exact component={Profile}></Route>

        <Route path="/employee-login" exact component={EmployeeLogin}></Route>

        <Route path="/start-up" exact component={StartUp}></Route>

        <Route
          path="/supervisor-login"
          exact
          component={SupervisorLogin}
        ></Route>

        <Route exact path="/">
          <StartUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
