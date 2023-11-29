import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import RegisterPatientPage from "./pages/RegisterPatientPage";
import DoctorAppointmentPage from "./pages/DoctorAppointmentpage";
import NotFound from "./pages/NotFound"; // Import the Not Found page component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register_patient" element={<RegisterPatientPage />} />
        <Route path="/doctor_appointment" element={<DoctorAppointmentPage />} />

        {/* Catch-all route for displaying "Not Found" page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
