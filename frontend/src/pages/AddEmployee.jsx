import React, { useEffect, useState } from "react";
import {
  addNewEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService.js";

import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
  const navigator = useNavigate();

  const [firstname, setFirstName] = useState("");

  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const { id } = useParams();

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstname, lastname, email };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        addNewEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstname.trim()) {
      errorsCopy.firstname = "";
    } else {
      errorsCopy.firstname = "First name is Required ";
    }

    if (lastname.trim()) {
      errorsCopy.lastname = "";
    } else {
      errorsCopy.lastname = " Last name is required ";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = " Email is required ";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center"> Update Employee Detail</h2>;
    } else {
      return <h2 className="text-center"> Add New Employees</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
      });
    }
  }, [id]);

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstname}
                  className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label"> Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastname"
                  value={lastname}
                  className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Email</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                {" "}
                Sumbit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
