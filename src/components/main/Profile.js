import React, { Component } from "react";
import { EmployeeReducer } from "../../redux/EmployeeReducer";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
    this.openView = this.openView.bind(this);
    this.deleteId = this.deleteId.bind(this);
  }

  componentDidMount() {
    EmployeeReducer.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  openView = () => {
    this.props.history.push(`/employees/${this.state.id}`);
  };

  deleteId = (id) => {
    EmployeeReducer.deleteEmployee(id).then((res) => {
      this.props.history.push("/employees");
    });
  };

  render() {
    return (
      <div>
        <div className="text-center">
          <h2>User Profile Card</h2>
          <br />
          <br />
          <div className="card col-md-4 offset-md-4">
            <img alt="profile" src="public\profile.jpeg" />
            <div>
              <h1> {this.state.employee.employeeName}</h1>
            </div>
            <div>
              <label> Employee ID: </label>
              {this.state.id}
            </div>
            <p className="title">{this.state.employee.employeeRole}</p>
            <p>Capgemini</p>
            <button className="button1">
              Contact
              <br />
              {this.state.employee.employeeEmail}
            </button>
          </div>
          <div>
            <button className="btn btn-success" onClick={this.openView}>
              {" "}
              Back{" "}
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => this.deleteId(this.state.id)}
            >
              {" "}
              Delete{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
