import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

function DoctorPrescription({ patientId, handleRefresh }) {
  const [patientData, setPatientData] = useState(null);
  const [notes, setNotes] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [suggestedMedicines, setSuggestedMedicines] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://65.2.183.251:8000/get-patient/${patientId}`
        );
        const data = await response.json();

        if (data.responseCode === 200) {
          setPatientData(data.data);
        } else {
          // Handle error when patient is not found
          console.error("Patient not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    // Fetch patient data when component mounts
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleMedicinesChange = (selectedOptions) => {
    setSelectedMedicines(selectedOptions);
  };

  useEffect(() => {
    // Simulate fetching suggestions from an API
    const dummySuggestions = [
      "Paracetamol",
      "Ibuprofen",
      "Aspirin",
      "Amoxicillin",
    ];
    setSuggestedMedicines(dummySuggestions);
  }, []);

  const handleSubmit = async (e, print) => {
    e.preventDefault();

    try {
      // Add logic to submit the prescription data and update patient
      const response = await fetch(
        `http://65.2.183.251:8000/update-patient/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notes,
            medicines: selectedMedicines,
          }),
        }
      );

      const data = await response.json();

      if (data.responseCode === 200) {
        console.log("Prescription submitted successfully!");

        // Use SweetAlert2 for a popup
        Swal.fire({
          title: "Success!",
          text: `thank you for submitting the prescription for ${patientData.name}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
        // Reload the parent component data

        // Clear the form
        setNotes("");
        setSelectedMedicines([]);

        // Reload the parent component data
        handleRefresh();
      } else {
        console.error("Error submitting prescription:", data.message);
      }
    } catch (error) {
      console.error("Error submitting prescription:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="register-patient register-prescription">
      <p onClick={handleLogout}>
        <span>
          <FaArrowLeft />
        </span>
        logout
      </p>
      <h2>Doctor Prescription</h2>
      {patientData ? (
        <div>
          <div className="patient-details">
            <div className="title">
              <h3>Patient Details</h3>
              <div className="patient-data">
                <p>{patientData.name}</p>
                <p>
                  <span>Age:</span>
                  {patientData.age}
                </p>
              </div>
            </div>
            <div className="details">
              <div className="current-details details-item">
                <p>
                  <span>current Blood Pressure:</span>
                  {patientData.currentBloodPressure}
                </p>
                <p>
                  <span>current Sugar:</span>
                  {patientData.currentSugar}
                </p>
                <p>
                  <span>Weight:</span>
                  {patientData.weight}
                </p>
                <p>
                  <span>Height:</span>
                  {patientData.height}
                </p>
                <p>
                  <span>current Health Issues:</span>
                  {patientData.currentHealthIssues}
                </p>
              </div>

              <div className="past-details details-item">
                <p>
                  <span>average BP:</span>
                  {patientData.averageBP}
                </p>
                <p>
                  <span>averag Sugar:</span>
                  {patientData.averageSugar}
                </p>
                <p>
                  <span>previous Surgeries:</span>
                  {patientData.previousSurgeries}
                </p>
                <p>
                  <span>previous Medical History:</span>
                  {patientData.previousMedicalHistory}
                </p>
              </div>
            </div>
          </div>
          <div className="doctor-prescription">
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className="form-item textarea">
                <textarea
                  id="notes"
                  className="form-input textarea"
                  name="notes"
                  value={notes}
                  onChange={handleNotesChange}
                />
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
              </div>
              <div className="form-item  medicine-box">
                <label htmlFor="medicines" className="form-label">
                  Medicines:
                </label>
                <Select
                  id="medicines"
                  name="medicines"
                  className="form-input "
                  value={selectedMedicines}
                  onChange={handleMedicinesChange}
                  options={suggestedMedicines.map((medicine) => ({
                    value: medicine,
                    label: medicine,
                  }))}
                  isMulti
                />
              </div>
              <div className="submit-box">
                <button
                  type="submit"
                  className="switch-btn"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  Submit{" "}
                </button>
                <button
                  type="submit"
                  className="switch-btn active"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  Submit and Print
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Please select the patient</p>
      )}
    </div>
  );
}

export default DoctorPrescription;
