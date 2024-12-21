import { useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import useToken from "../utils/useToken";
import authContext from "./authContext";
import { data } from "react-router";

export const AuthProvider = ({ children }) => {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      setToken({ token: access_token });
      setUser({ email });
      return { status: "success", message: "Login efetuado com sucesso!" };
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao fazer login" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post("/users", { name, email, password });
      const { data } = response.data;
      setUser({ name: data.name, email: data.email });
      setToken({ token: data.access_token });
      return { status: "success", message: "Usuário cadastrado com sucesso!" };
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao cadastrar usuário" };
    }
  };

  const RankedVideos = async () => {
    try {
      const response = await api.get("/video");
      return {
        status: response.data.type,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao cadastrar usuário" };
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <authContext.Provider
      value={{
        user,
        token,
        signed: !!user,
        signin,
        signup,
        signout,
        RankedVideos,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
