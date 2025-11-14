import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {

      const token = localStorage.getItem("accessToken");
       console.log("token from loaduser",token);
      if (token) {
        try {
          const res = await axios.get(`http://localhost:8000/user/profile/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data.user) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error("Failed to load user:", error);
          // localStorage.removeItem("accessToken");
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

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getData = () => useContext(UserContext);
