export const url = "https://shopease-2-19yq.onrender.com/api"

export const setHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "x-auth-token": token,
    },
  };

  return headers;
};
