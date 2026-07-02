import React, { useEffect, useState } from "react";
import {
  addNewEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService.js";
import { listDepartments } from "../services/DepartmentService.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getRole, getLoggedInEmployeeId } from "../services/AuthService.js";

const AVATARS = ['😊','🧑‍💻'];

const AddEmployee = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "", // Read-only on update
    departmentId: "",
    designation: "",
    phone: "",
    address: "",
    profilePhoto: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const role = getRole();
  const loggedInEmployeeId = getLoggedInEmployeeId();

  useEffect(() => {
    // Security check: Employees can only edit their own profile
    if (id && role !== 'ADMIN' && String(id) !== loggedInEmployeeId) {
      navigator("/employees");
      return;
    }

    listDepartments().then((res) => setDepartments(res.data)).catch(console.error);

    if (id) {
      setLoading(true);
      getEmployee(id)
        .then((response) => {
          setEmployee({
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            email: response.data.email || "",
            departmentId: response.data.departmentId || "",
            designation: response.data.designation || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
            profilePhoto: response.data.profilePhoto || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!employee.firstname.trim()) {
      errorsCopy.firstname = "First name is required";
      valid = false;
    }
    if (!employee.lastname.trim()) {
      errorsCopy.lastname = "Last name is required";
      valid = false;
    }
    if (!employee.departmentId) {
      errorsCopy.departmentId = "Department is required";
      valid = false;
    }
    if (!employee.designation.trim()) {
      errorsCopy.designation = "Designation is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      
      const employeeData = { 
        firstname: employee.firstname, 
        lastname: employee.lastname, 
        departmentId: employee.departmentId,
        designation: employee.designation,
        phone: employee.phone,
        address: employee.address,
        profilePhoto: employee.profilePhoto
      };

      if (id) {
        updateEmployee(id, employeeData)
          .then((response) => {
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
            setIsSubmitting(false);
          });
      } else {
        addNewEmployee(employeeData)
          .then((response) => {
            setGeneratedData(response.data);
            setShowModal(true);
            setIsSubmitting(false);
          })
          .catch((error) => {
            console.error(error);
            setIsSubmitting(false);
          });
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigator("/employees");
  };

  if (loading) {
    return <div className="container py-5 text-center"><div className="spinner-border text-primary" /></div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom py-3">
               <h4 className="card-title fw-bold mb-0">{id ? "Update Employee" : "Add Employee"}</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={saveOrUpdateEmployee}>
                
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">First Name *</label>
                    <input type="text" name="firstname" value={employee.firstname} className={`form-control ${errors.firstname ? "is-invalid" : ""}`} onChange={handleChange} disabled={isSubmitting} />
                    {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Last Name *</label>
                    <input type="text" name="lastname" value={employee.lastname} className={`form-control ${errors.lastname ? "is-invalid" : ""}`} onChange={handleChange} disabled={isSubmitting} />
                    {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                  </div>
                </div>

                {id && (
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Email (Auto-generated)</label>
                    <input type="email" value={employee.email} className="form-control" disabled />
                  </div>
                )}

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Department *</label>
                    <select name="departmentId" value={employee.departmentId} className={`form-select ${errors.departmentId ? "is-invalid" : ""}`} onChange={handleChange} disabled={isSubmitting}>
                      <option value="">Select Department</option>
                      {departments.map((dept) => <option key={dept.id} value={dept.id}>{dept.departmentName}</option>)}
                    </select>
                    {errors.departmentId && <div className="invalid-feedback">{errors.departmentId}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Designation *</label>
                    <input type="text" name="designation" placeholder="e.g. Software Engineer" value={employee.designation} className={`form-control ${errors.designation ? "is-invalid" : ""}`} onChange={handleChange} disabled={isSubmitting} />
                    {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Phone (Optional)</label>
                    <input type="text" name="phone" value={employee.phone} className="form-control" onChange={handleChange} disabled={isSubmitting} />
                  </div>
                  <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Avatar / Profile Photo</label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {AVATARS.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setEmployee({ ...employee, profilePhoto: emoji })}
                        style={{
                          fontSize: '1.8rem',
                          background: employee.profilePhoto === emoji ? '#e7f1ff' : '#f8f9fa',
                          border: employee.profilePhoto === emoji ? '2px solid #0d6efd' : '2px solid transparent',
                          borderRadius: '8px', padding: '4px 8px', cursor: 'pointer'
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {employee.profilePhoto && (
                    <div className="text-muted small">Selected: <span style={{ fontSize: '1.4rem' }}>{employee.profilePhoto}</span></div>
                  )}
                </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Address (Optional)</label>
                  <input type="text" name="address" value={employee.address} className="form-control" onChange={handleChange} disabled={isSubmitting} />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-5 border-top pt-4">
                  <Link to="/employees" className="btn btn-light" disabled={isSubmitting}>Cancel</Link>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL FOR GENERATED CREDENTIALS */}
      {showModal && generatedData && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title"><i className="bi bi-check-circle-fill me-2"></i>Employee Created!</h5>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted mb-4">Please securely copy these auto-generated credentials and share them with the new employee. They will be required to log in.</p>
                <div className="bg-light p-3 rounded border">
                  <div className="mb-2"><strong>Employee ID:</strong> <span className="text-primary">{generatedData.employeeId}</span></div>
                  <div className="mb-2"><strong>Company Email:</strong> <span className="text-primary">{generatedData.email}</span></div>
                  <div><strong>Temp Password:</strong> <span className="text-danger fw-bold">{generatedData.generatedPassword}</span></div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-primary w-100" onClick={handleModalClose}>
                  I have copied the credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AddEmployee;
