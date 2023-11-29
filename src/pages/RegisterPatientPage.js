import React, { useState } from "react";
import RegisterPatient from "../components/RegisterPatient";
import ListRegisterPatients from "../components/ListRegisterPatients";

function RegisterPatientPage() {
  const [refreshData, setRefreshData] = useState(false);

  return (
    <div className="switch-login" style={{ alignItems: "start" }}>
      <RegisterPatient
        onRegistrationSuccess={() => setRefreshData(!refreshData)}
      />
      <ListRegisterPatients refreshData={refreshData} />
    </div>
  );
}

export default RegisterPatientPage;
