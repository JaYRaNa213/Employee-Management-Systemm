import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const REST_API_BASE_URL = `${BASE}/api/auth`;

export const loginAPICall = (email, password) => {
  return axios.post(REST_API_BASE_URL + "/login", { email, password });
};

export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (email, role, employeeId, firstLogin) => {
  sessionStorage.setItem("authenticatedUser", email);
  sessionStorage.setItem("role", role);
  if (employeeId) sessionStorage.setItem("employeeId", employeeId);
  sessionStorage.setItem("firstLogin", firstLogin);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username != null;
};

export const getLoggedInUser = () => {
  return sessionStorage.getItem("authenticatedUser");
};

export const getLoggedInEmployeeId = () => {
  return sessionStorage.getItem("employeeId");
};

export const getRole = () => {
  return sessionStorage.getItem("role");
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
