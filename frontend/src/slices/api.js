// src/slices/api.js
import config from "../config";

export const url = config.apiUrl;

export const setHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "x-auth-token": token || "",
    },
  };
};