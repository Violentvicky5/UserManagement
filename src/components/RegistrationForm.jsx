import React from "react";

const RegistrationForm = () => {
  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();   // stop submit
      event.stopPropagation();  // stop bubbling
    }

    // Bootstrap trigger
    form.classList.add("was-validated");
  };
  
    return (
    <div className="container mt-4">
      <form    className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}>

        {/* Name */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            required
            minLength={3}
            pattern="[A-Za-z\s]+"
          />
          <div className="invalid-feedback">
            Name must be at least 3 characters and alphabets only.
          </div>
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            required
          />
          <div className="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="10–15 digits"
            required
            pattern="[0-9]{10,15}"
          />
          <div className="invalid-feedback">
            Phone number must be 10–15 digits.
          </div>
        </div>

        {/* Address (Optional) */}
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            maxLength={150}
            placeholder="Enter address"
            required
          />
          <div className="invalid-feedback">
            Enter Your Address
          </div>
        </div>

        {/* State */}
        <div className="col-md-6">
          <label htmlFor="state" className="form-label">State</label>
          <select className="form-select" id="state" required>
            <option value="">Choose...</option>
            <option>Tamil Nadu</option>
            <option>Kerala</option>
            <option>Karnataka</option>
          </select>
          <div className="invalid-feedback">
            State is required.
          </div>
        </div>

        {/* City */}
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            required
          />
          <div className="invalid-feedback">
            City is required.
          </div>
        </div>

        {/* Country */}
        <div className="col-md-6">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            required
          />
          <div className="invalid-feedback">
            Country is required.
          </div>
        </div>

        {/* Pincode */}
        <div className="col-md-6">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            required
            pattern="[0-9]{4,10}"
          />
          <div className="invalid-feedback">
            Pincode must be 4–10 digits.
          </div>
        </div>

        {/* Profile Image */}
        <div className="col-md-6">
          <label htmlFor="profileImage" className="form-label">Profile Image</label>
          <input
            type="file"
            className="form-control"
            id="profileImage"
            accept=".jpg,.png"
            required
          />
          <div className="invalid-feedback">
            Upload JPG or PNG (max 2MB).
          </div>
        </div>

        {/* Password */}
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            minLength={6}
            pattern="(?=.*\d).{6,}"
          />
          <div className="invalid-feedback">
            Password must be at least 6 characters and contain a number.
          </div>
        </div>

        {/* Submit */}
        <div className="col-12 center">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegistrationForm;
