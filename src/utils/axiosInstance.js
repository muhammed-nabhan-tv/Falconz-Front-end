
import axios from "axios";
import { navigateTo } from "./navigate";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ── flag to prevent multiple simultaneous refresh calls 
let isRefreshing = false;
let failedQueue  = []; // queue of requests waiting for new token

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// ── attach access token ───────────────────────────────────
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  const token  = stored ? JSON.parse(stored).accessToken : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── handle 401 → refresh → retry ─────────────────────────
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const original = error.config;

    // ✅ only handle 401 and skip if it's already the refresh call itself
    if (
      error.response?.status !== 401 ||
      original._retry              ||
      original.url === "/auth/refresh" // ← prevents refresh endpoint looping
    ) {
      return Promise.reject(error);
    }

    // ✅ if refresh already in progress — queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        })
        .catch((err) => Promise.reject(err));
    }

    original._retry  = true;
    isRefreshing     = true;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/refresh",
        {},
        { withCredentials: true }
      );

      // ✅ update localStorage with new token
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored) {
        stored.accessToken = data.accessToken;
        localStorage.setItem("user", JSON.stringify(stored));
      }

      // ✅ unblock all queued requests with new token
      processQueue(null, data.accessToken);

      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);

    } catch (refreshError) {
      // ✅ refresh failed — clear everything and redirect once
      processQueue(refreshError, null);
      localStorage.removeItem("user");
      navigateTo("/login");
      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false; // ✅ always reset the flag
    }
  }
);

export default api;