// src/index.ts
import axiosLib from "axios";
var SessionExpiredEvent = class extends Event {
  constructor() {
    super("session-expired");
  }
};
var sessionEventTarget = new EventTarget();
var getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  const port = process.env.PORT || 3e3;
  return process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:${port}/api`;
};
var axios = axiosLib.create({
  baseURL: getBaseURL(),
  timeout: 1e4,
  headers: {
    "Content-Type": "application/json"
  }
});
axios.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionEventTarget.dispatchEvent(new SessionExpiredEvent());
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    }
    const normalizedError = {
      message: error.message || "An error occurred",
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code
    };
    return Promise.reject(normalizedError);
  }
);
function onSessionExpired(callback) {
  const handleSessionExpired = () => callback();
  sessionEventTarget.addEventListener("session-expired", handleSessionExpired);
  return () => {
    sessionEventTarget.removeEventListener("session-expired", handleSessionExpired);
  };
}
var index_default = axios;
export {
  axios,
  index_default as default,
  onSessionExpired
};
