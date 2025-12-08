import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5240/api", // apni API URL dalna
});

export default api;
