import { Link, useHistory } from "react-router-dom";

export const StartUp = () => {
  const history = useHistory();
  return (
    <body className="bg-light image ">
      <div>
        <h1
          className=" p-5"
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontStyle: "initial",
            color: "blue",
          }}
        >
          TIMECARD APPLICATION
        </h1>
      </div>

      <div>
        <h3
          className=" p-2 m-1"
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontStyle: "initial",
            color: "tomato",
          }}
        >
          Select Your Role
        </h3>
      </div>

      <div
        style={{
          textAlign: "center",
          fontFamily: "-moz-initial",
          fontStyle: "initial",
        }}
        //  className="bg-white"
      >
        <button
          className="bttn btn-primary rounded varient-light m-5 p-3"
          as={Link}
          to="/employee-login"
          onClick={() => history.push("/employee-login")}
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontStyle: "initial",
          }}
        >
          EMPLOYEE
        </button>

        <button
          className="bttn btn-primary rounded varient-light m-5 p-3 "
          as={Link}
          to="/supervisor-login"
          onClick={() => history.push("/supervisor-login")}
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontStyle: "initial",
          }}
        >
          SUPERVISOR
        </button>
      </div>
    </body>
  );
};
//className="bg-secondary variant-dark"
