import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

const backendURL = "";
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem('isLoggedIn');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem('userData');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ✅ Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/user/data`,
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
    }
  };

  // ✅ Check login state (IMPORTANT FOR REFRESH)
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
    }
  };

  useEffect(() => {
    getAuthState(); // 🔥 runs on refresh
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};