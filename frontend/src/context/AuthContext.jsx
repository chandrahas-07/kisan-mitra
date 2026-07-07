import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("kisan-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  function login(username, role) {

  const mockUser = {
    name: username,
    role,
  };

  localStorage.setItem(
    "kisan-user",
    JSON.stringify(mockUser)
  );

  setUser(mockUser);
}
    

  function logout() {

    localStorage.removeItem("kisan-user");

    setUser(null);
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );
}

export function useAuth() {
  return useContext(AuthContext);
}