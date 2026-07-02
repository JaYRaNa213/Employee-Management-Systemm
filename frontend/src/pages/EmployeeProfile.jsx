import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService';
import { isUserLoggedIn, getRole, getLoggedInEmployeeId } from '../services/AuthService';

const AVATARS = ['😊','🧑‍💻'];

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuth = isUserLoggedIn();
  const role = getRole();
  const loggedInEmployeeId = getLoggedInEmployeeId();
  
  const canEdit = role === 'ADMIN' || (role === 'EMPLOYEE' && loggedInEmployeeId === String(employee?.id));

  useEffect(() => {
    getEmployee(id)
      .then(res => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load employee profile.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error || 'Employee not found.'}</h4>
        <Link to="/employees" className="btn btn-outline-primary mt-3">Back to Directory</Link>
      </div>
    );
  }

  const avatar = employee.profilePhoto || AVATARS[employee.id % AVATARS.length];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Back Button */}
          <Link to="/employees" className="btn btn-outline-secondary btn-sm mb-4">
            ← Back to Directory
          </Link>

          {/* Profile Card */}
          <div className="card border-0 shadow-sm overflow-hidden">
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0d6efd, #6610f2)', height: '120px' }} />

            <div className="card-body px-4 pb-4" style={{ marginTop: '-60px' }}>
              {/* Avatar */}
              <div
                className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow mb-3"
                style={{ width: '110px', height: '110px', fontSize: '4rem', border: '4px solid white' }}
              >
                {avatar}
              </div>

              {/* Name & Badge */}
              <div className="mb-3">
                <h3 className="fw-bold mb-1">{employee.firstname} {employee.lastname}</h3>
                <span className="badge bg-primary me-2">{employee.designation || 'Employee'}</span>
                {employee.employeeId && (
                  <span className="badge bg-secondary">{employee.employeeId}</span>
                )}
              </div>

              {/* Details — full details only when logged in */}
              {isAuth ? (
                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted small text-uppercase fw-semibold mb-1">Email</div>
                      <div className="fw-semibold">{employee.email || '—'}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted small text-uppercase fw-semibold mb-1">Phone</div>
                      <div className="fw-semibold">{employee.phone || '—'}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted small text-uppercase fw-semibold mb-1">Department</div>
                      <div className="fw-semibold">{employee.departmentId ? `Dept #${employee.departmentId}` : '—'}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted small text-uppercase fw-semibold mb-1">Address</div>
                      <div className="fw-semibold">{employee.address || '—'}</div>
                    </div>
                  </div>

                  {/* Admin or Self edit button */}
                  {canEdit && (
                    <div className="col-12 mt-2">
                      <Link to={`/update-employee/${employee.id}`} className="btn btn-primary">
                        ✏️ Edit Profile
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="alert alert-info mt-3">
                  <Link to="/login">Login</Link> to view full contact details.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
