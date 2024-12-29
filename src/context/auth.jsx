import { useState } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import useToken from "../utils/useToken";
import authContext from "./authContext";

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
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return {
        status: "error",
        message: "Erro ao buscar vídeos classificados",
      };
    }
  };

  const getVotingVideos = async () => {
    try {
      const response = await api.get("/video/vote");
      return {
        status: response.data.type,
        message: response.data.message,
        data: response.data.data,
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao buscar vídeos para votação" };
    }
  };

  const voteForVideo = async (videoId) => {
    try {
      const response = await api.post("/vote", { videoId, vote: 1 });
      return {
        status: response.data.type,
        message: response.data.message,
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao registrar voto" };
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
        getVotingVideos,
        voteForVideo,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
