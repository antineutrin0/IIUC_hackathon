import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);

  // Load user from token on initial mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // Fetch user data using the token
          const res = await axios.get(`http://localhost:8000/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error("Failed to load user:", error);
          // If token is invalid, remove it
          localStorage.removeItem("accessToken");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const getData = () => useContext(UserContext);
=======
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};
>>>>>>> 10819885386911cd5c2591d2c5c8f2a6ff2aa582
