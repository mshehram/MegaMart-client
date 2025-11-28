// src/config/api.js

// The full API endpoint for fetching data
export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_URL;

// The base URL for images or other resources
export const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL.replace("/api", "");
