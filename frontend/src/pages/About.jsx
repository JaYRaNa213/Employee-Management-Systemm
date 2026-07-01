import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-3">About This Project</h2>
                <p className="text-muted lead">
                  A modern, production-ready Employee Management System built with Java Spring Boot and React.
                </p>
              </div>

              <h5 className="fw-bold border-bottom pb-2 mb-4">Overview</h5>
              <p className="text-muted-custom mb-5">
                This application serves as a comprehensive CRUD (Create, Read, Update, Delete) platform 
                designed for HR departments to manage employee records efficiently. It features a clean, 
                responsive administrative dashboard focusing on usability and professional aesthetics.
              </p>

              <div className="row mb-5">
                <div className="col-md-6 mb-4 mb-md-0">
                  <h5 className="fw-bold border-bottom pb-2 mb-3">Backend Stack</h5>
                  <ul className="list-group list-group-flush text-muted-custom">
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-success me-2"></i> Java 17</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-success me-2"></i> Spring Boot</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-success me-2"></i> Spring Data JPA</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-success me-2"></i> MySQL</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-success me-2"></i> RESTful APIs</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold border-bottom pb-2 mb-3">Frontend Stack</h5>
                  <ul className="list-group list-group-flush text-muted-custom">
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-primary me-2"></i> React 19</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-primary me-2"></i> Vite</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-primary me-2"></i> React Router DOM</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-primary me-2"></i> Axios</li>
                    <li className="list-group-item bg-transparent border-0 px-0 py-1"><i className="bi bi-check-circle-fill text-primary me-2"></i> Bootstrap 5</li>
                  </ul>
                </div>
              </div>

              <h5 className="fw-bold border-bottom pb-2 mb-4">Architecture</h5>
              <div className="bg-light p-4 rounded text-center mb-5 border">
                <div className="d-flex flex-column align-items-center fw-medium text-dark">
                  <div className="px-3 py-2 bg-white rounded shadow-sm mb-2 w-50">React (Vite)</div>
                  <i className="bi bi-arrow-down text-muted my-1"></i>
                  <div className="px-3 py-2 bg-white rounded shadow-sm mb-2 w-50">Axios (HTTP Calls)</div>
                  <i className="bi bi-arrow-down text-muted my-1"></i>
                  <div className="px-3 py-2 bg-white rounded shadow-sm mb-2 w-50">Spring Boot (REST API)</div>
                  <i className="bi bi-arrow-down text-muted my-1"></i>
                  <div className="px-3 py-2 bg-white rounded shadow-sm mb-2 w-50">Spring Data JPA</div>
                  <i className="bi bi-arrow-down text-muted my-1"></i>
                  <div className="px-3 py-2 bg-white rounded shadow-sm w-50">MySQL Database</div>
                </div>
              </div>

              <h5 className="fw-bold border-bottom pb-2 mb-3">Key Features</h5>
              <div className="row g-3 text-muted-custom">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-database me-2 mt-1 text-secondary"></i>
                    <span>Full CRUD Operations</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-layout-text-window me-2 mt-1 text-secondary"></i>
                    <span>Responsive UI Design</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-layers me-2 mt-1 text-secondary"></i>
                    <span>Layered Architecture</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-box-seam me-2 mt-1 text-secondary"></i>
                    <span>DTO Design Pattern</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
