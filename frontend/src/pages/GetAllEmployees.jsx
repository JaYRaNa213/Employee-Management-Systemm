import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService.js';
import { useNavigate, Link } from 'react-router-dom';
import { isUserLoggedIn, getRole } from '../services/AuthService.js';

const AVATARS = ['😊','🧑‍💻'];

const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isAuth = isUserLoggedIn();
  const role = getRole();
  const navigator = useNavigate();

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = () => {
    setLoading(true);
    listEmployees().then((response) => {
      setEmployees(response.data);
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const executeDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id)
        .then(() => {
          setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
          setShowDeleteModal(false);
          setEmployeeToDelete(null);
          setToastMessage('Employee Deleted Successfully');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch(error => {
          console.error(error);
          setShowDeleteModal(false);
        });
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const term = searchTerm.toLowerCase();
    return (
      emp.firstname.toLowerCase().includes(term) ||
      emp.lastname.toLowerCase().includes(term) ||
      (emp.email || '').toLowerCase().includes(term) ||
      (emp.designation || '').toLowerCase().includes(term) ||
      (emp.employeeId || '').toLowerCase().includes(term)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOption === 'Name A-Z') return a.firstname.localeCompare(b.firstname);
    if (sortOption === 'Name Z-A') return b.firstname.localeCompare(a.firstname);
    if (sortOption === 'Newest') return b.id - a.id;
    if (sortOption === 'Oldest') return a.id - b.id;
    return 0;
  });

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0">Employee Directory</h2>
          <p className="text-muted mb-0">{employees.length} team members</p>
        </div>
        {isAuth && role === 'ADMIN' && (
          <Link to="/add-employee" className="btn btn-primary shadow-sm">
            <i className="bi bi-person-plus-fill me-2"></i>Add Employee
          </Link>
        )}
      </div>

      {/* Search & Sort */}
      <div className="row mb-4">
        <div className="col-md-7 mb-3 mb-md-0">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search by name, email, designation, employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 offset-md-2">
          <select className="form-select shadow-sm" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Newest">Sort: Newest</option>
            <option value="Oldest">Sort: Oldest</option>
            <option value="Name A-Z">Sort: A → Z</option>
            <option value="Name Z-A">Sort: Z → A</option>
          </select>
        </div>
      </div>

      {/* Employee Cards Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '3rem' }}>📭</div>
          <h4 className="mt-3">No Employees Yet</h4>
          {isAuth && role === 'ADMIN' && (
            <Link to="/add-employee" className="btn btn-primary mt-3">Add First Employee</Link>
          )}
        </div>
      ) : (
        <div className="row g-4">
          {sortedEmployees.map((employee) => (
            <div className="col-md-4 col-sm-6" key={employee.id}>
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div style={{ fontSize: '2.5rem' }}>
                      {employee.profilePhoto || AVATARS[employee.id % AVATARS.length]}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold text-dark">{employee.firstname} {employee.lastname}</div>
                      {employee.employeeId && (
                        <span className="badge bg-light text-secondary small">{employee.employeeId}</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      {employee.designation || 'Employee'}
                    </span>
                  </div>

                  {/* Show email only if logged in */}
                  {isAuth && (
                    <div className="text-muted small mb-3">
                      <i className="bi bi-envelope me-1"></i>{employee.email}
                    </div>
                  )}

                  <div className="d-flex gap-2 mt-3">
                    <Link to={`/employee/${employee.id}`} className="btn btn-sm btn-outline-primary flex-grow-1">
                      View Profile
                    </Link>
                    {isAuth && role === 'ADMIN' && (
                      <>
                        <Link to={`/update-employee/${employee.id}`} className="btn btn-sm btn-outline-secondary" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(employee)} title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow">
                <div className="modal-header text-danger">
                  <h5 className="modal-title fw-bold">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>Delete Employee?
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body py-4">
                  <p>Are you sure you want to delete <strong>{employeeToDelete?.firstname} {employeeToDelete?.lastname}</strong>? This cannot be undone.</p>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={executeDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : ''}`} role="alert">
          <div className="d-flex">
            <div className="toast-body"><i className="bi bi-check-circle-fill me-2"></i>{toastMessage}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllEmployees;