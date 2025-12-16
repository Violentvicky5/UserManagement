import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!isValidEmailOrPhone(formData.identifier)) {
      form.classList.add("was-validated");
      return;
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    console.log({
      identifier: formData.identifier,
      password: formData.password,
    });

    form.classList.add("was-validated");
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
          Login
        </span>
      </div>

      <form
        className="row g-3 needs-validation p-2 border"
        style={{ borderRadius: "15px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-12">
          <div className="floating-label">
            <input
              type="text"
              className={`form-control ${
                formData.identifier && !isValidEmailOrPhone(formData.identifier)
                  ? "is-invalid"
                  : ""
              }`}
              id="identifier"
              placeholder=""
              required
              value={formData.identifier}
              onChange={handleChange}
            />
            <label htmlFor="identifier" className="form-label">
              Email or Phone
            </label>
            <div className="invalid-feedback">
              Enter a valid email or 10–15 digit phone number.
            </div>
          </div>
        </div>

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

        <div className="col-12 center">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
