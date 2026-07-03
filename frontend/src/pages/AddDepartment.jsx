import React, { useState } from "react";
import { addNewDepartment } from "../services/DepartmentService.js";
import { useNavigate, Link } from "react-router-dom";

const AddDepartment = () => {
  const navigator = useNavigate();

  const [department, setDepartment] = useState({
    departmentName: "",
    departmentCode: "",
    departmentDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!department.departmentName.trim()) {
      errorsCopy.departmentName = "Department Name is required";
      valid = false;
    }
    if (!department.departmentCode.trim()) {
      errorsCopy.departmentCode = "Department Code is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const saveDepartment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const departmentData = {
        departmentName: department.departmentName,
        departmentCode: department.departmentCode,
        departmentDescription: department.departmentDescription,
      };

      addNewDepartment(departmentData)
        .then((response) => {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            navigator("/");
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom py-3">
              <h4 className="card-title fw-bold mb-0">Add Department</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={saveDepartment}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Department Name *</label>
                    <input
                      type="text"
                      name="departmentName"
                      value={department.departmentName}
                      className={`form-control ${errors.departmentName ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="e.g. Engineering"
                    />
                    {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Department Code *</label>
                    <input
                      type="text"
                      name="departmentCode"
                      value={department.departmentCode}
                      className={`form-control ${errors.departmentCode ? "is-invalid" : ""}`}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="e.g. ENG"
                    />
                    {errors.departmentCode && <div className="invalid-feedback">{errors.departmentCode}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">Department Description (Optional)</label>
                  <textarea
                    name="departmentDescription"
                    value={department.departmentDescription}
                    className="form-control"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows="3"
                    placeholder="Brief description of the department's role"
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-5 border-top pt-4">
                  <Link to="/" className="btn btn-light" disabled={isSubmitting}>
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Department"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div className={`toast align-items-center text-white bg-success border-0 ${showToast ? "show" : ""}`} role="alert">
          <div className="d-flex">
            <div className="toast-body"><i className="bi bi-check-circle-fill me-2"></i>Department Added Successfully!</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
