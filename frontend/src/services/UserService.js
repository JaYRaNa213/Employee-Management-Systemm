import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const REST_API_BASE_URL = `${BASE}/api/users`;

export const createUser = (user) => {
  return axios.post(REST_API_BASE_URL, user);
};

export const listUsers = () => {
  return axios.get(REST_API_BASE_URL);
};

export const getUserByEmail = (email) => {
  return axios.get(REST_API_BASE_URL + "/email/" + email);
};
