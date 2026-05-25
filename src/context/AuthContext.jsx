import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/axiosInstance";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState("user");
  const [loading, setLoading] = useState(true);

  // ── Load user from localStorage on app start ──────────────
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setRole(parsed.role || "user");
    }
    setLoading(false);
  }, []);

  // ── REGISTER ──────────────────────────────────────────────
  const register = async (firstName, lastName, email, password) => {
    try {
      const res = await api.post("/users/register", { firstName, lastName, email, password });
      const data = res.data;

      // auto login after register
      return await login(email, password);
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  // ── LOGIN ─────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      const data = res.data;

      const loggedInUser = {
        id:          data.user.id,
        name:        `${data.user.firstName} ${data.user.lastName || ""}`.trim(),
        email:       data.user.email,
        role:        data.user.role,
        isBlocked:   data.user.isBlocked,
        accessToken: data.accessToken,
      };

      setUser(loggedInUser);
      setRole(data.user.role);

      localStorage.setItem("user", JSON.stringify(loggedInUser));


      return loggedInUser;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────
  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // ✅ tell backend to clear cookie + wipe refreshToken from DB
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err); // don't block UI logout on error
    } finally {
      // always clear local state regardless of API success
      setUser(null);
      setRole("user");
      localStorage.removeItem("user");
    }
  };

  // ── Expose accessToken getter for axios/fetch calls ────────
  const getAccessToken = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).accessToken : null;
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, register, login, getAccessToken,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};