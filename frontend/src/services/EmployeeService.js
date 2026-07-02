import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const REST_API_BASE_URL = `${BASE}/api/employees`;

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL);
};

export const addNewEmployee = (employee) =>
  axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId) =>
  axios.get(REST_API_BASE_URL + "/" + employeeId);

export const updateEmployee = (employeeId, employee) =>
  axios.put(REST_API_BASE_URL + "/" + employeeId, employee);

export const deleteEmployee = (employeeId) =>
  axios.delete(REST_API_BASE_URL + "/" + employeeId);
