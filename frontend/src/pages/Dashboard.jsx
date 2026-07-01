import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listEmployees } from '../services/EmployeeService';

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    listEmployees()
      .then((response) => {
        const employees = response.data;
        setTotalEmployees(employees.length);
        
        // Sort by ID descending to get newest first, then take last 5
        const sorted = [...employees].sort((a, b) => b.id - a.id);
        setRecentEmployees(sorted.slice(0, 5));
        
        setApiStatus('Backend Connected');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setApiStatus('API Disconnected');
        setLoading(false);
      });
  };

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="hero-section text-center mb-5 border">
        <h1 className="display-6 fw-bold mb-3 text-dark">Employee Management System</h1>
        <p className="lead text-muted mb-4">
          Manage employee records efficiently using a modern CRUD application built with Spring Boot and React.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/add-employee" className="btn btn-primary px-4 py-2">
            <i className="bi bi-person-plus-fill me-2"></i>
            Add Employee
          </Link>
          <Link to="/employees" className="btn btn-outline-secondary px-4 py-2">
            <i className="bi bi-people-fill me-2"></i>
            View Employees
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className="icon-square bg-primary bg-opacity-10 text-primary me-3">
                <i className="bi bi-people"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1 text-uppercase">Total Employees</h6>
                <h3 className="mb-0 fw-bold">{loading ? <div className="spinner-border spinner-border-sm text-primary" /> : totalEmployees}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className="icon-square bg-success bg-opacity-10 text-success me-3">
                <i className="bi bi-diagram-3"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1 text-uppercase">Departments</h6>
                <h3 className="mb-0 fw-bold">Coming Soon</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className={`icon-square ${apiStatus === 'Backend Connected' ? 'bg-info bg-opacity-10 text-info' : 'bg-danger bg-opacity-10 text-danger'} me-3`}>
                <i className={`bi ${apiStatus === 'Backend Connected' ? 'bi-server' : 'bi-exclamation-triangle'}`}></i>
              </div>
              <div>
                <h6 className="text-muted mb-1 text-uppercase">Application Status</h6>
                <h3 className="mb-0 fw-bold fs-5 mt-2">{loading ? <div className="spinner-border spinner-border-sm text-info" /> : apiStatus}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Employees Section */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold"><i className="bi bi-clock-history me-2"></i>Recently Added Employees</h5>
          <Link to="/employees" className="btn btn-sm btn-link text-decoration-none">View All</Link>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading recent employees...</p>
            </div>
          ) : recentEmployees.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Employee</th>
                    <th>Email</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar bg-light text-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                            {employee.firstname.charAt(0)}{employee.lastname.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">{employee.firstname} {employee.lastname}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-muted-custom align-middle">{employee.email}</td>
                      <td className="text-end pe-4 py-3 align-middle">
                        <Link to={`/update-employee/${employee.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3">No Employees Found</h5>
              <p className="text-muted">Start building your team by adding the first employee.</p>
              <Link to="/add-employee" className="btn btn-primary mt-2">
                <i className="bi bi-plus-circle me-2"></i>Add Employee
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
