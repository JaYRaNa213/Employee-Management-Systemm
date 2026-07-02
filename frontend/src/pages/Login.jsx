import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();
    console.log("=== [DEBUG] Login form submitted ===");
    console.log("[DEBUG] Email:", email);
    console.log("[DEBUG] Password length:", password.length);
    try {
      console.log("[DEBUG] Calling loginAPICall...");
      const response = await loginAPICall(email, password);
      console.log("[DEBUG] SUCCESS! Full response:", response);
      console.log("[DEBUG] Response data:", response.data);

      const token = response.data.accessToken;
      const role = response.data.role;
      const firstLogin = response.data.firstLogin;
      const employeeId = response.data.employeeId;

      console.log("[DEBUG] Token:", token ? token.substring(0, 30) + "..." : "NULL");
      console.log("[DEBUG] Role:", role);

      storeToken(token);
      saveLoggedInUser(email, role, employeeId, firstLogin);

      navigate("/"); // Dashboard
      window.location.reload(); // Refresh state
    } catch (err) {
      console.error("=== [DEBUG] Login FAILED ===");
      console.error("[DEBUG] Error object:", err);
      console.error("[DEBUG] HTTP Status:", err.response?.status);
      console.error("[DEBUG] Response data:", err.response?.data);
      console.error("[DEBUG] Error message:", err.message);
      setError("Invalid Email or Password — Check browser console for details");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <div className="alert alert-info small mb-4">
                <strong>To access and test the system use :</strong><br/>
                Admin: admin@faang.com / password : admin123<br/>
                Employee: karan.rana@faang.com / password : 12345678
              </div>

              <form onSubmit={handleLoginForm}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
