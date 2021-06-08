import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AttendanceUpsert } from "./components/AttendanceUpsert";
import { AttendanceList } from "./components/AttendanceList";
import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";

function App() {
  return (
    <Router>
      <AppNavBar />

      <Switch>
        <Route path="/create-attendance">
          <AttendanceUpsert />
        </Route>

        <Route path="/list-attendance">
          <AttendanceList />
        </Route>

        <Route exact path="/">
          <AttendanceList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
