import { createContext, useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import useToken from "../utils/useToken";

export const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { access_token } = response.data;
      setToken({ token: access_token });
      setUser({ email });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <authContext.Provider value={{ user, token, signed: !!user, signin, signout }}>
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};