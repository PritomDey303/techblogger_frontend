//get token from session storage or local storage
export const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};
