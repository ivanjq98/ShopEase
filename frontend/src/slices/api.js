export const url = process.env.BACKEND_URL

export const setHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      "x-auth-token": token,
    },
  };

  return headers;
};
