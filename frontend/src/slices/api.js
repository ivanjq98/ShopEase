export const url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const setHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "x-auth-token": token,
    },
  };

  return headers;
};
