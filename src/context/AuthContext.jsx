import { createContext, useState, useEffect ,useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // 🔄 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }

    setLoading(false);
  }, []);

  // ✅ REGISTER
const register = async (firstName, lastName, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // auto login after register
    return await login(email, password);

  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const userData = data.user;

      const loggedInUser = {
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName || ""}`.trim(),
        email: userData.email,
        role: userData.role, // string ("user" / "admin")
        blocked: userData.blocked,
        token: data.token,
      };

      setUser(loggedInUser);
      setRole(userData.role);

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", data.token);

      return loggedInUser;

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setRole("user");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};