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
      const { access_token, isAdmin } = response.data;
      setToken({ token: access_token });
      setUser({ email, isAdmin });
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
      setUser({ name: data.name, email: data.email, isAdmin: data.isAdmin });
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

  const addVideo = async (videoData) => {
    try {
      const response = await api.post("/video", videoData);
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
      return { status: "error", message: "Erro ao adicionar vídeo" };
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/users");
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
      return { status: "error", message: "Erro ao buscar usuários" };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      if (response.status === 204) {
        return {
          status: "success",
          message: "User excluído com sucesso!",
        };
      } else {
        return {
          status: "error",
          message: "Erro ao excluir user",
        };
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao excluir usuário" };
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const response = await api.delete(`/video/${videoId}`);
      if (response.status === 204) {
        return {
          status: "success",
          message: "Vídeo excluído com sucesso!",
        };
      } else {
        return {
          status: "error",
          message: "Erro ao excluir vídeo",
        };
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message.message
          ? error.response.data.message.message
          : error.response.data.message.message[0];
        return { status: "error", message: errorMessage };
      }
      return { status: "error", message: "Erro ao excluir vídeo" };
    }
  };

  const getVideos = async () => {
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
      return { status: "error", message: "Erro ao buscar vídeos" };
    }
  };
  const addAdmin = async ({ name, email, password }) => {
    try {
      const response = await api.post("/auth/admin", { name, email, password });
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
        message: "Erro ao adicionar administrador",
      };
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
        addVideo,
        deleteVideo,
        getUsers,
        deleteUser,
        addAdmin,
        getVideos,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
