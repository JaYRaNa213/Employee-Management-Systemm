import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService.js';
import { useNavigate, Link } from 'react-router-dom';

const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Newest');
  
  // Delete Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Toast state (in a real app you might use a context or library, keeping it simple here)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp => {
    const term = searchTerm.toLowerCase();
    return (
      emp.firstname.toLowerCase().includes(term) ||
      emp.lastname.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOption === 'Name A-Z') {
      return a.firstname.localeCompare(b.firstname);
    } else if (sortOption === 'Name Z-A') {
      return b.firstname.localeCompare(a.firstname);
    } else if (sortOption === 'Newest') {
      return b.id - a.id;
    } else if (sortOption === 'Oldest') {
      return a.id - b.id;
    }
    return 0;
  });

  return (
    <div className="container py-4">
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0">Employees</h2>
          <p className="text-muted mb-0">Manage employee records.</p>
        </div>
        <Link to="/add-employee" className="btn btn-primary shadow-sm">
          <i className="bi bi-person-plus-fill me-2"></i>Add Employee
        </Link>
      </div>

      {/* Top Bar: Search and Sort */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Search by First Name, Last Name, or Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 offset-md-3">
          <select 
            className="form-select shadow-sm" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Newest">Sort by: Newest</option>
            <option value="Oldest">Sort by: Oldest</option>
            <option value="Name A-Z">Sort by: Name A-Z</option>
            <option value="Name Z-A">Sort by: Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Employee Table / Loading / Empty State */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
             <div className="text-center py-5">
               <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
               <p className="mt-2 text-muted">Loading employees...</p>
             </div>
          ) : employees.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-people text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h4 className="mb-2">No Employees Found</h4>
              <p className="text-muted mb-4">Add your first employee to get started.</p>
              <Link to="/add-employee" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Employee
              </Link>
            </div>
          ) : sortedEmployees.length === 0 ? (
            <div className="empty-state py-5 text-center">
              <h5 className="text-muted">No matches found for "{searchTerm}"</h5>
              <button className="btn btn-link" onClick={() => setSearchTerm('')}>Clear search</button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Employee</th>
                    <th>Email</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar bg-light text-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                            {employee.firstname.charAt(0).toUpperCase()}{employee.lastname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">{employee.firstname} {employee.lastname}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-custom py-3">{employee.email}</td>
                      <td className="text-end pe-4 py-3">
                        <Link 
                          to={`/update-employee/${employee.id}`} 
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => confirmDelete(employee)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal (Bootstrap manual implementation) */}
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
                  <p className="mb-0">
                    Are you sure you want to delete <strong>{employeeToDelete?.firstname} {employeeToDelete?.lastname}</strong>? 
                    This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer bg-light border-top-0">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={executeDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              <i className="bi bi-check-circle-fill me-2"></i> {toastMessage}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)} aria-label="Close"></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GetAllEmployees;