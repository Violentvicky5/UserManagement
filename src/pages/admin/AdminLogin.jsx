import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!isValidEmail(formData.username)) {
      form.classList.add("was-validated");
      return;
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${URL}/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
       body: JSON.stringify({
  identifier: formData.username, 
  password: formData.password
}),

      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Admin login failed");
        return;
      }

      // Store JWT
      sessionStorage.setItem("accessToken", data.accessToken);

      // Navigate to admin dashboard
      navigate("/admin/dashboard");
      form.classList.remove("was-validated");
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header ">
        <span className="fw-bold text-white m-2">User Management Application</span>
        <span className="fw-bold text-white m-2">Help</span>
      </div>
    <div className=" p-3 center" style={{height:"70vh"}}>
      <div className="d-flex  p-3 border rounded-5 ">
        
      <div
  className="container center mt-4 mb-4"
  style={{
    backgroundColor:"brown",
    borderTopLeftRadius: "25px",
    borderBottomLeftRadius: "25px",
  }}
>
  <h4 className="text-white fw-bolder">Super Admin Login</h4>
</div>

    <div className="container mt-4 mb-4 ">
      
      <div className="">
        <span
          className="bg-white fw-bold p-1"
          style={{
            position: "relative",
            bottom: "4px",
            left: "25px",
            
            borderRadius: "5px",
            padding: "3px",
          }}
        >
          Admin Login
        </span>
      </div>

      <form
        className="row g-3 needs-validation p-2 border"
        style={{ borderRadius: "15px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="alert alert-danger w-100" role="alert">
            {error}
          </div>
        )}

        {/* Username */}
        <div className="col-md-12">
          <div className="floating-label">
            <input
              type="email"
              className={`form-control ${
                formData.username && !isValidEmail(formData.username)
                  ? "is-invalid"
                  : ""
              }`}
              id="username"
              placeholder=""
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="username" className="form-label">
              Admin Email
            </label>
            <div className="invalid-feedback">
              Enter a valid admin email.
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="col-md-12">
          <div className="floating-label">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder=""
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="invalid-feedback">
              Password must be at least 6 characters.
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="col-12 center">
          <button className="btn_hover btn border fw-bolder text-black" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </div>
      </form>
    </div>
    </div>
</div>
<div>
 <footer
  style={{
    borderTop: "1px solid #ddd",
    padding: "12px 0",
    textAlign: "center",
    marginTop: "40px",
    fontSize: "14px",
    color: "#555",
  }}
>
  © {new Date().getFullYear()} Your Project Name. All rights reserved.
</footer>

</div>
  </div>
  );
};

export default AdminLogin;
