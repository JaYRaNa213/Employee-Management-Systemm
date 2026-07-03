import React, { useEffect, useState } from 'react';
import { listDepartments, deleteDepartment } from '../services/DepartmentService.js';
import { useNavigate, Link } from 'react-router-dom';
import { isUserLoggedIn, getRole } from '../services/AuthService.js';

const GetAllDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isAuth = isUserLoggedIn();
  const role = getRole();
  const navigator = useNavigate();

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = () => {
    setLoading(true);
    listDepartments().then((response) => {
      setDepartments(response.data);
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  const confirmDelete = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const executeDelete = () => {
    if (departmentToDelete) {
      deleteDepartment(departmentToDelete.id)
        .then(() => {
          setDepartments(departments.filter(dept => dept.id !== departmentToDelete.id));
          setShowDeleteModal(false);
          setDepartmentToDelete(null);
          setToastMessage('Department Deleted Successfully');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch(error => {
          console.error(error);
          setShowDeleteModal(false);
        });
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0">Department Directory</h2>
          <p className="text-muted mb-0">{departments.length} total departments</p>
        </div>
        {isAuth && role === 'ADMIN' && (
          <Link to="/add-department" className="btn btn-primary shadow-sm">
            <i className="bi bi-building-add me-2"></i>Add Department
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading departments...</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '3rem' }}>🏢</div>
          <h4 className="mt-3">No Departments Yet</h4>
          {isAuth && role === 'ADMIN' && (
            <Link to="/add-department" className="btn btn-primary mt-3">Add First Department</Link>
          )}
        </div>
      ) : (
        <div className="row g-4">
          {departments.map((dept) => (
            <div className="col-md-4 col-sm-6" key={dept.id}>
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div style={{ fontSize: '2.5rem' }}>🏢</div>
                    <div className="flex-grow-1">
                      <div className="fw-bold text-dark fs-5">{dept.departmentName}</div>
                      <span className="badge bg-light text-secondary small">{dept.departmentCode}</span>
                    </div>
                  </div>

                  <div className="mb-3 text-muted">
                    {dept.departmentDescription || 'No description provided.'}
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    {isAuth && role === 'ADMIN' && (
                      <button className="btn btn-sm btn-outline-danger w-100" onClick={() => confirmDelete(dept)} title="Delete">
                        <i className="bi bi-trash me-2"></i>Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow">
                <div className="modal-header text-danger">
                  <h5 className="modal-title fw-bold">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>Delete Department?
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body py-4">
                  <p>Are you sure you want to delete <strong>{departmentToDelete?.departmentName}</strong>? This cannot be undone.</p>
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

export default GetAllDepartments;
