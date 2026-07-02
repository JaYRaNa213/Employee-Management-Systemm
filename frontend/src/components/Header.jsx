import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, getRole, logout, getLoggedInEmployeeId } from '../services/AuthService';

const Header = () => {
  const isAuth = isUserLoggedIn();
  const role = getRole();
  const employeeId = getLoggedInEmployeeId();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
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

            <div className="d-flex align-items-center gap-3">
              {isAuth && employeeId && employeeId !== 'undefined' && employeeId !== 'null' && (
                <Link to={`/employee/${employeeId}`} className="btn btn-outline-primary shadow-sm">
                  <i className="bi bi-person-circle me-2"></i>
                  My Profile
                </Link>
              )}

              {isAuth && role === 'ADMIN' && (
                <Link to="/add-employee" className="btn btn-primary shadow-sm">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Add Employee
                </Link>
              )}

              {isAuth ? (
                <button onClick={handleLogout} className="btn btn-outline-danger shadow-sm">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary shadow-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;