import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const REST_API_BASE_URL = `${BASE}/api/department`;

export const listDepartments = () => {
  return axios.get(REST_API_BASE_URL);
};

export const addNewDepartment = (department) =>
  axios.post(REST_API_BASE_URL, department);

export const getDepartment = (departmentId) =>
  axios.get(REST_API_BASE_URL + "/" + departmentId);

export const deleteDepartment = (departmentId) =>
  axios.delete(REST_API_BASE_URL + "/" + departmentId);
