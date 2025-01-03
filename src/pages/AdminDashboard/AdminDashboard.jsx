import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AdminDashboard = () => {
  const { getVideos, deleteVideo, getUsers, deleteUser, addAdmin } = useAuth();
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await getVideos();
        const userResponse = await getUsers();
        if (
          videoResponse.status === "success" &&
          userResponse.status === "success"
        ) {
          setVideos(videoResponse.data);
          setUsers(userResponse.data.filter((user) => user.role === "admin"));
        } else {
          toast.error("Failed to fetch data");
        }
      } catch {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getVideos, getUsers]);

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await deleteVideo(videoId);
      console.log(response);
      if (response.status === 204) {
        toast.success("Vídeo excluído com sucesso!");
        setVideos(videos.filter((video) => video.id !== videoId));
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro ao excluir vídeo");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === "success") {
        toast.success("Usuário excluído com sucesso!");
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro ao excluir usuário");
    }
  };

  const handleAddAdmin = async () => {
    try {
      const response = await addAdmin({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
      });
      if (response.status === "success") {
        toast.success("Administrador adicionado com sucesso!");
        setUsers([...users, response.data]);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setShowModal(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro ao adicionar administrador");
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.section}>
        <h2>
          Gerenciar Usuários
          <Button
            variant="primary"
            className={styles.addAdminButton}
            onClick={() => setShowModal(true)}
          >
            Adicionar Admin
          </Button>
        </h2>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <div className={styles.userInfo}>
                <p>{user.email}</p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Gerenciar Vídeos</h2>
        <table className={styles.table}>
          <thead
            onClick={() => setShowVideos(!showVideos)}
            className={styles.tableHeader}
          >
            <tr>
              <th>Nome do Vídeo</th>
              <th>Total de Votos</th>
              <th>Ações</th>
            </tr>
          </thead>
          {showVideos && (
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>{video.title}</td>
                  <td>{video.rating}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nome"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            className={styles.input}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddAdmin}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
