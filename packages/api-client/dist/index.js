"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  axios: () => axios,
  default: () => index_default,
  onSessionExpired: () => onSessionExpired
});
module.exports = __toCommonJS(index_exports);
var import_axios = __toESM(require("axios"));
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
var axios = import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  axios,
  onSessionExpired
});
