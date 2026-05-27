export const url = "https://shopease-1-5tkn.onrender.com/api"

export const setHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "x-auth-token": token,
    },
  };

  return headers;
};
