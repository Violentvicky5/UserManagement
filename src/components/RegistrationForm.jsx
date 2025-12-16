import React, { useState } from "react";
import { Toast } from "bootstrap";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
    profileImage: null,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };
  const showToast = (message, type = "success") => {
    const toastEl = document.getElementById("appToast");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastEl.querySelector(".toast-body").innerText = message;

    const toast = new Toast(toastEl);
    toast.show();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("was-validated");
    setLoading(true);
    setMessage("");

    try {
      // Use FormData because we have a file
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        showToast("Registration failed", "danger");
      } else {
        showToast("Registration successful!", "success");

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          state: "",
          city: "",
          country: "",
          pincode: "",
          profileImage: null,
          password: "",
        });
        form.classList.remove("was-validated");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div>
        <span
          className="bg-dark fw-bold"
          style={{
            position: "relative",
            bottom: "4px",
            left: "25px",
            color: "white",
            borderRadius: "5px",
            padding: "3px",
          }}
        >
          New Registration
        </span>
      </div>

      {message && (
        <div className="alert alert-info mt-2" role="alert">
          {message}
        </div>
      )}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          id="appToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body"></div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      </div>

      <form
        className="row g-3 needs-validation p-2 border"
        style={{ borderRadius: "15px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              required
              minLength={3}
              pattern="[A-Za-z\s]+"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="invalid-feedback">
              Name must be at least 3 characters and alphabets only.
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder=""
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder=""
              required
              pattern="[0-9]{10,15}"
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <div className="invalid-feedback">
              Phone number must be 10–15 digits.
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              className="form-control"
              id="address"
              maxLength={150}
              placeholder=""
              required
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <div className="invalid-feedback">Enter Your Address</div>
          </div>
        </div>

        {/* State */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder=""
              required
              value={formData.state}
              onChange={handleChange}
            />
            <label htmlFor="state" className="form-label">
              State
            </label>
            <div className="invalid-feedback">State is required.</div>
          </div>
        </div>

        {/* City */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder=""
              required
              value={formData.city}
              onChange={handleChange}
            />
            <label htmlFor="city" className="form-label">
              City
            </label>
            <div className="invalid-feedback">City is required.</div>
          </div>
        </div>

        {/* Country */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder=""
              required
              value={formData.country}
              onChange={handleChange}
            />
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <div className="invalid-feedback">Country is required.</div>
          </div>
        </div>

        {/* Pincode */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="text"
              className="form-control"
              id="pincode"
              placeholder=""
              required
              pattern="[0-9]{4,10}"
              value={formData.pincode}
              onChange={handleChange}
            />
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <div className="invalid-feedback">Pincode must be 4–10 digits.</div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="col-md-6">
          <input
            type="file"
            className="form-control"
            id="profileImage"
            accept=".jpg,.png"
            required
            onChange={handleChange}
          />
          <label htmlFor="profileImage" className="form-label smallText">
            Upload Profile Image
          </label>
          <div className="invalid-feedback">Upload JPG or PNG (max 2MB).</div>
        </div>

        {/* Password */}
        <div className="col-md-6">
          <div className="floating-label">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder=""
              required
              minLength={6}
              pattern="(?=.*\d).{6,}"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="invalid-feedback">
              Password must be at least 6 characters and contain a number.
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="col-12 center">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
