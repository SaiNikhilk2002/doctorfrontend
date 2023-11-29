import React, { useState, useEffect } from "react";

function DoctorAppointment({ onPatientClick, handleRefresh }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    document.title = "Doctor Appointment";
  }, []);

  console.log(handleRefresh);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://65.2.183.251:8000/patients-list")
      .then((response) => response.json())
      .then((data) => setPatients(data.data))
      .catch((error) => console.error("Error fetching patients list:", error));
  }, [handleRefresh]);

  const handlePatientClick = (_id) => {
    // Send the Aadhar number to the parent component
    onPatientClick(_id);

    // Update the selectedPatient state
    setSelectedPatient(_id);
  };

  return (
    <div className="appointment-list">
      <div className="appointment-list-container">
        <div className="title">
          <h2>Doctor Appointment</h2>
        </div>
        <div className="patient-list">
          <h3>Patients List:</h3>
          {patients?.length === 0 || patients === null ? (
            <p style={{ textAlign: "center" }}>No patients found.</p>
          ) : (
            <div className="patients">
              {patients?.map((patient) => (
                <div
                  className={`patient ${
                    selectedPatient === patient._id ? "selected" : ""
                  }`}
                  key={patient.id}
                  onClick={() => handlePatientClick(patient._id)}
                >
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
}

export default DoctorAppointment;
