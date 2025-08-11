// Helper to read cookies on client-side
const getCookie = (name) => {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const getToken = () => {
  return getCookie('token');
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    document.cookie = `token=${token}; path=/; max-age=604800`;
  }
};

export const destroyToken = () => {
  if (typeof window !== "undefined") {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};