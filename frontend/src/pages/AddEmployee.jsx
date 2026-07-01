import React, { useEffect, useState } from "react";
import {
  addNewEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService.js";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddEmployee = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      getEmployee(id)
        .then((response) => {
          setEmployee({
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            email: response.data.email || "",
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
    
    // Clear error when user types
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employee.email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(employee.email)) {
      errorsCopy.email = "Please enter a valid email address";
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
        email: employee.email 
      };

      if (id) {
        updateEmployee(id, employeeData)
          .then((response) => {
            handleSuccess("Employee Updated Successfully");
          })
          .catch((error) => {
            console.error(error);
            setIsSubmitting(false);
          });
      } else {
        addNewEmployee(employeeData)
          .then((response) => {
            handleSuccess("Employee Added Successfully");
          })
          .catch((error) => {
            console.error(error);
            setIsSubmitting(false);
          });
      }
    }
  };

  const handleSuccess = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigator("/employees");
    }, 1500);
  };

  const pageTitle = () => {
    if (id) {
      return (
        <>
          <h4 className="card-title fw-bold mb-0">Update Employee</h4>
          <p className="text-muted small mb-0">Edit employee details in the system</p>
        </>
      );
    } else {
      return (
        <>
          <h4 className="card-title fw-bold mb-0">Add Employee</h4>
          <p className="text-muted small mb-0">Register a new employee in the system</p>
        </>
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom py-3">
              {pageTitle()}
            </div>
            <div className="card-body p-4">
              <form onSubmit={saveOrUpdateEmployee}>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="e.g. John"
                    value={employee.firstname}
                    className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="e.g. Doe"
                    value={employee.lastname}
                    className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={employee.email}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2 mt-5 border-top pt-4">
                  <Link to="/employees" className="btn btn-light" disabled={isSubmitting}>
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              <i className="bi bi-check-circle-fill me-2"></i> {toastMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
