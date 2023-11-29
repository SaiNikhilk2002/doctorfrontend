import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPatient = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    adharCardNo: "",
    age: "",
    currentBloodPressure: "",
    currentSugar: "",
    currentHealthIssues: "",
    previousMedicalHistory: [],
    medicinesUsed: [],
    averageBP: "",
    averageSugar: "",
    previousSurgeries: [],
    height: "",
    weight: "",
    doctorId: "6565a117502fc1274ef6ed10",
  });

  useEffect(() => {
    document.title = "Register Patient";
  }, []);

  const navigate = useNavigate();

  const [registrationMessage, setRegistrationMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.split(",") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://65.2.183.251:8000/register-patient-by-compounder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful registration, e.g., redirect to a new page.
        console.log("Patient registered successfully");

        const responseData = await response.json();

        // Handle successful registration

        const { patientId, name } = responseData.data;

        // Use SweetAlert2 for a popup
        Swal.fire({
          title: "Success!",
          text: `Patient registered successfully  Name: ${name}`,

          icon: "success",
          confirmButtonText: "OK",
        });
        setRegistrationMessage(responseData.data);
        onRegistrationSuccess();
        // Clear the form
        setFormData({
          name: "",
          phone: "",
          adharCardNo: "",
          age: "",
          currentBloodPressure: "",
          currentSugar: "",
          currentHealthIssues: "",
          previousMedicalHistory: [],
          medicinesUsed: [],
          averageBP: "",
          averageSugar: "",
          previousSurgeries: [],
          height: "",
          weight: "",
          doctorId: "6565a117502fc1274ef6ed10",
        });
      } else {
        // Handle registration failure
        console.error("Patient registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="register-patient">
      <p onClick={handleLogout}>
        <span>
          <FaArrowLeft />
        </span>
        logout
      </p>
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-item">
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            name="name"
            required
            data-error="Please enter the name"
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="phone"
            className="form-input"
            placeholder=" "
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            required
            title="Please enter the phone number"
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="adharCardNo"
            className="form-input"
            placeholder=" "
            value={formData.adharCardNo}
            onChange={handleChange}
            name="adharCardNo"
            required
            title="Please enter the aadhar card number"
          />
          <label htmlFor="adharCardNo" className="form-label">
            Aadhar Card Number
          </label>
        </div>

        {/* Add other form fields as needed */}
        <div className="form-item">
          <input
            type="text"
            id="age"
            className="form-input"
            placeholder=" "
            value={formData.age}
            onChange={handleChange}
            name="age"
            required
            title="Please enter the age"
          />
          <label htmlFor="age" className="form-label">
            Age
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="height"
            className="form-input"
            placeholder=" "
            value={formData.height}
            onChange={handleChange}
            name="height"
          />
          <label htmlFor="height" className="form-label">
            Height
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="weight"
            className="form-input"
            placeholder=" "
            value={formData.weight}
            onChange={handleChange}
            name="weight"
          />
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="currentBloodPressure"
            className="form-input"
            placeholder=" "
            value={formData.currentBloodPressure}
            onChange={handleChange}
            name="currentBloodPressure"
            required
            title="Please enter the current blood pressure"
          />
          <label htmlFor="currentBloodPressure" className="form-label">
            Current Blood Pressure
          </label>
        </div>

        <div className="form-item">
          <input
            type="text-box"
            id="currentSugar"
            className="form-input"
            placeholder=" "
            value={formData.currentSugar}
            onChange={handleChange}
            name="currentSugar"
            required
            title="Please enter the current sugar level"
          />
          <label htmlFor="currentSugar" className="form-label">
            Current Sugar Level
          </label>
        </div>

        <div className="form-item">
          <input
            type="text-box"
            id="averageSugar"
            className="form-input"
            placeholder=" "
            value={formData.averageSugar}
            onChange={handleChange}
            name="averageSugar"
          />
          <label htmlFor="averageSugar" className="form-label">
            Average Sugar Level
          </label>
        </div>

        <div className="form-item">
          <input
            type="text"
            id="averageBP"
            className="form-input"
            placeholder=" "
            value={formData.averageBP}
            onChange={handleChange}
            name="averageBP"
          />
          <label htmlFor="averageBP" className="form-label">
            Average Blood Pressure
          </label>
        </div>

        <div className="form-item textarea">
          <textarea
            id="currentHealthIssues"
            className="form-input textarea"
            placeholder=" "
            value={formData.currentHealthIssues}
            onChange={handleChange}
            name="currentHealthIssues"
            required
          />
          <label htmlFor="currentHealthIssues" className="form-label">
            Current Health Issues
          </label>
        </div>

        {/* Example for handling array input */}
        <div className="form-item textarea">
          <textarea
            type="text"
            id="previousMedicalHistory"
            className="form-input"
            placeholder=" "
            value={formData.previousMedicalHistory.join(",")}
            onChange={handleArrayChange}
            name="previousMedicalHistory"
          />
          <label htmlFor="previousMedicalHistory" className="form-label">
            Previous Medical History (comma-separated)
          </label>
        </div>

        <div className="form-item textarea">
          <textarea
            type="text"
            id="medicineUsed"
            className="form-input"
            placeholder=" "
            value={formData.medicinesUsed.join(",")}
            onChange={handleArrayChange}
            name="medicinesUsed"
          />
          <label htmlFor="medicineUsed" className="form-label">
            Medicines Used (comma-separated)
          </label>
        </div>

        <div className="form-item textarea">
          <textarea
            type="text"
            id="previousSurgeries"
            className="form-input"
            placeholder=" "
            value={formData.previousSurgeries.join(",")}
            onChange={handleArrayChange}
            name="previousSurgeries"
          />
          <label htmlFor="previousSurgeries" className="form-label">
            Previous Surgeries (comma-separated)
          </label>
        </div>

        {/* Add other form fields as needed */}
        <div className="form-item submit-form">
          <button type="submit" className="submit-btn switch-btn active">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
