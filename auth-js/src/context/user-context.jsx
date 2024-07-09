import { createContext, useState, useEffect } from "react";
const UserContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <UserContext.Provider
      value={{ token, updateToken, role, setRole, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
