import React, { useEffect, useState } from "react";
import "./style.css";
import CompounderLogin from "./CompounderLogin";
import DoctorLogin from "./DoctorLogin";

const Login = () => {
  const [activeRole, setActiveRole] = useState("doctor");

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

  return (
    <div className="switch-login">
      <div className="switch-login-container">
        <ul className="switch-container">
          <li>
            <button
              className={`switch-doctor switch-btn ${
                activeRole === "doctor" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("doctor")}
            >
              Doctor
            </button>
          </li>
          <li>
            <button
              className={`switch-compounder switch-btn ${
                activeRole === "compounder" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("compounder")}
            >
              Compounder
            </button>
          </li>
        </ul>

        {activeRole === "doctor" ? <DoctorLogin /> : <CompounderLogin />}
      </div>
    </div>
  );
};

export default Login;
