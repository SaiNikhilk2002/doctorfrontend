import React, { useState } from "react";
import DoctorAppointment from "../components/DoctorAppointment";
import DoctorPrescription from "../components/Doctorprescription";

function DoctorAppointmentPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const handlePatientClick = (_id) => {
    // Highlight the selected patient
    setSelectedPatient(_id);
  };

  const handleRefresh = () => {
    // You can implement your logic to refresh data here
    console.log("Refreshing data...");
    setRefreshData(!refreshData);
  };

  console.log(refreshData);

  return (
    <div className="switch-login" style={{ alignItems: "start" }}>
      <DoctorPrescription
        patientId={selectedPatient}
        handleRefresh={handleRefresh}
      />
      <DoctorAppointment
        onPatientClick={handlePatientClick}
        handleRefresh={handleRefresh} // Make sure this line is correct
      />
    </div>
  );
}

export default DoctorAppointmentPage;
