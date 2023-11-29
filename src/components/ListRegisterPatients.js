import React, { useEffect, useState } from "react";
import "./style.css";

const ListRegisterPatients = ({ refreshData }) => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    fetch("http://65.2.183.251:8000/patients-list")
      .then((response) => response.json())
      .then((data) => setPatients(data.data))
      .catch((error) => console.error("Error fetching patients list:", error));
  }, [refreshData]);
  return (
    <div className="appointment-list">
      <div className="appointment-list-container">
        <div className="title">
          <h2>Registered Patients</h2>
        </div>
        <div className="patient-list">
          <h3>Patients List:</h3>
          {patients?.length === 0 ? (
            <p style={{ textAlign: "center" }}>No patients found.</p>
          ) : (
            <div className="patients">
              {patients?.map((patient) => (
                <div className="patient" key={patient.id}>
                  <div className="patient-title">
                    <h4>{patient.name}</h4>
                    <p>
                      <span>Age: </span> {patient.age}
                    </p>
                  </div>
                  <div className="content">
                    <p>
                      <span>Heath Issue:</span> {patient.currentHealthIssues}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListRegisterPatients;
