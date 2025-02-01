import { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const decodedToken = jwtDecode(user.accessToken);
        setUser({ ...user, decodedToken });
      } else {
        setUser(null);
      }
    });
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const decodedToken = await jwtDecode(result.user.accessToken);
      setUser({ ...result.user, decodedToken });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
