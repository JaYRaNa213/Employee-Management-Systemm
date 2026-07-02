import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listEmployees } from '../services/EmployeeService';
import { listDepartments } from '../services/DepartmentService';
import { isUserLoggedIn, getRole } from '../services/AuthService';

const AVATARS = ['😊','🧑‍💻'];

const Dashboard = () => {
  const isAuth = isUserLoggedIn();
  const role = getRole();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listEmployees().catch(() => ({ data: [] })),
      listDepartments().catch(() => ({ data: [] }))
    ]).then(([empRes, deptRes]) => {
      setEmployees(empRes.data || []);
      setDepartments(deptRes.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  /* ── PUBLIC HOME PAGE ── */
  if (!isAuth) {
    return (
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-2">FAANG Employee Management</h1>
          <p className="text-muted lead mb-4">Manage your workforce with ease. Login to access full features.</p>
          <Link to="/login" className="btn btn-primary btn-lg px-5">Login to System</Link>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm text-center py-5">
              <div className="display-3 fw-bold text-primary">{employees.length}</div>
              <div className="text-muted fs-5 mt-1">Total Employees</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm text-center py-5">
              <div className="display-3 fw-bold text-success">{departments.length}</div>
              <div className="text-muted fs-5 mt-1">Total Departments</div>
            </div>
          </div>
        </div>

        {/* Preview employee cards (public — names only) */}
        <h5 className="fw-bold mb-3">Our Team</h5>
        <div className="row g-3">
          {employees.slice(0, 6).map(emp => (
            <div className="col-md-4 col-sm-6" key={emp.id}>
              <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                <div style={{ fontSize: '2.2rem' }}>{emp.profilePhoto || AVATARS[emp.id % AVATARS.length]}</div>
                <div>
                  <div className="fw-semibold">{emp.firstname} {emp.lastname}</div>
                  <div className="text-muted small">{emp.designation || 'Employee'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentEmployees = [...employees].sort((a, b) => b.id - a.id).slice(0, 5);

  /* ── ADMIN DASHBOARD ── */
  if (role === 'ADMIN') {
    return (
      <div className="container py-4">
        <h2 className="fw-bold mb-1">Admin Dashboard</h2>
        <p className="text-muted mb-4">Welcome back, Administrator</p>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #0d6efd', borderRadius: '12px' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="fs-1 text-primary">👥</div>
                <div>
                  <div className="text-muted small text-uppercase fw-semibold">Total Employees</div>
                  <div className="fs-2 fw-bold">{employees.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #198754', borderRadius: '12px' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="fs-1 text-success">🏢</div>
                <div>
                  <div className="text-muted small text-uppercase fw-semibold">Departments</div>
                  <div className="fs-2 fw-bold">{departments.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="card-body">
                <div className="text-muted small text-uppercase fw-semibold mb-3">Quick Actions</div>
                <div className="d-grid gap-2">
                  <Link to="/add-employee" className="btn btn-primary btn-sm">➕ Add Employee</Link>
                  <Link to="/employees" className="btn btn-outline-secondary btn-sm">📋 View All Employees</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3 border-bottom">
            <h5 className="mb-0 fw-bold">🕐 Recently Added Employees</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Employee</th>
                  <th>Employee ID</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: '1.6rem' }}>{emp.profilePhoto || AVATARS[emp.id % AVATARS.length]}</span>
                        <div>
                          <div className="fw-semibold">{emp.firstname} {emp.lastname}</div>
                          <div className="text-muted small">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-light text-dark">{emp.employeeId || '—'}</span></td>
                    <td className="text-muted">{emp.designation || '—'}</td>
                    <td className="text-muted">{emp.departmentId ? `Dept #${emp.departmentId}` : '—'}</td>
                    <td className="text-end pe-4">
                      <Link to={`/employee/${emp.id}`} className="btn btn-sm btn-outline-primary me-1">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /* ── EMPLOYEE DASHBOARD ── */
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Employee Dashboard</h2>
      <p className="text-muted mb-4">Welcome to your workspace</p>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm text-center py-4">
            <div className="display-4 fw-bold text-primary">{employees.length}</div>
            <div className="text-muted">Total Colleagues</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm text-center py-4">
            <div className="display-4 fw-bold text-success">{departments.length}</div>
            <div className="text-muted">Departments</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4">
            <div className="text-muted small text-uppercase fw-semibold mb-3">Quick Links</div>
            <div className="d-grid gap-2">
              <Link to="/employees" className="btn btn-primary btn-sm">👥 Employee Directory</Link>
            </div>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Team Members</h5>
      <div className="row g-3">
        {employees.slice(0, 6).map(emp => (
          <div className="col-md-4 col-sm-6" key={emp.id}>
            <Link to={`/employee/${emp.id}`} className="text-decoration-none">
              <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3 h-100">
                <span style={{ fontSize: '2.2rem' }}>{emp.profilePhoto || AVATARS[emp.id % AVATARS.length]}</span>
                <div>
                  <div className="fw-semibold text-dark">{emp.firstname} {emp.lastname}</div>
                  <div className="text-muted small">{emp.designation || 'Employee'}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
