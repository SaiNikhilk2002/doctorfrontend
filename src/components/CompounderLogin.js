import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CompounderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [compounderName, setCompounderName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Compounder Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://65.2.183.251:8000/login-compounder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const responseData = await response.json();
      // Check the responseCode from your API
      if (responseData.responseCode === 200) {
        // Handle successful login, e.g., redirect to a new page.
        console.log("Login successful");
        setError("");
        setCompounderName(responseData.data.name);
        navigate("/register_patient", { state: { compounderName } });
      } else {
        setError(responseData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="title">
          <h2>Login</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="form-container">
          <div className="form-item">
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
          <div className="form-item">
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <div className="form-item">
            <button className="submit-btn switch-btn active" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="footer">
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompounderLogin;
