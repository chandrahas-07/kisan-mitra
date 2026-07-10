import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { loginUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("kisan-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  async function login(email, password) {

    const response = await loginUser(email, password);

    localStorage.setItem(
      "kisan-user",
      JSON.stringify(response.user)
    );

    setUser(response.user);

    return response.user;

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