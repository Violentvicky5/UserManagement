import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const RegistrationPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div>
        <div className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-3 shadow toggleButton">
          <h3 className="text-white">Client Page</h3>
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"></a>
          <button
            className="navbar-toggler d-md-none"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebarMenu"
            aria-expanded={sidebarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${
              sidebarOpen ? "show" : ""
            }`}
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    <FontAwesomeIcon icon={faHouse} className="me-2" />
                    Home Page
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    New Registration
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                    LogIn
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div className="p-2" style={{ borderRadius: "15px" }}>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
