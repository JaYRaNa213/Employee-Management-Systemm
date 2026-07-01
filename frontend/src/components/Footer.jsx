import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 fw-semibold text-dark">Employee Management System</p>
            <small className="text-muted">Built with Spring Boot and React &copy; {currentYear}</small>
          </div>

          {/* Right Side */}
          <div className="col-md-6 text-center text-md-end">
            <a href="https://github.com/JaYRaNa213/Employee-Management-Systemm" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary me-2">
              <i className="bi bi-github me-1"></i> GitHub
            </a>
            <a href="https://my-portfolio-full-stack-one.vercel.app/" className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-briefcase me-1"></i> Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;