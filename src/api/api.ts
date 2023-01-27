import React from "react";
import axios from "axios";
// import { randomUUID } from "crypto";
// import { getLocalStorage } from "utils";

const api = axios.create({
     baseURL: process.env.REACT_APP_BASE_URL,
});

// Handle all configuration of request
api.interceptors.request.use(
     (config: any) => {
          config.headers["Content-Type"] = "application/json";
          config.headers.authorization = `Bearer ${localStorage.getItem(
               "token"
          )}`;
          // config.headers["lang"] = getLocalStorage("i18nextLng");
          return config;
     },
     (error) => {
          return Promise.reject(error);
     }
);

// Handle errors of all responses
api.interceptors.response.use(
     (response) => response.data,
     (err) => {
          if (err?.message === "Network Error") {
               // setIsNetworkErr(true);
               return Promise.reject(null);
          }
          return Promise.reject(err.response?.data);
     }
);

// Determine the percentage of uploading
export const apiProgress = (
     progressEvent: any,
     setProgress: React.Dispatch<React.SetStateAction<number>>
) => {
     let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
     );
     setProgress(percentCompleted);
};

export default api;
