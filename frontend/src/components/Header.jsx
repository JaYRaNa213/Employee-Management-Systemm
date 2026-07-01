import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          {/* Left: Logo and System Name */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-person-workspace text-primary fs-4 me-2"></i>
            <span className="fw-semibold">Employee Management System</span>
          </Link>

          {/* Toggle for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center: Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/employees">
                  Employees
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>

            {/* Right: Quick Action Button */}
            <div className="d-flex">
              <Link to="/add-employee" className="btn btn-primary shadow-sm">
                <i className="bi bi-person-plus-fill me-2"></i>
                Add Employee
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;