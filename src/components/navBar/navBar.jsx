import { Link } from "react-router";
import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";

const Menu = () => {
  const { signout, user } = useAuth();

  const handleLogout = () => {
    signout();
  };

  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link to="/dashboard">Vídeos Classificados</Link>
        </li>
        <li>
          <Link to="/vote">Votar em Vídeos</Link>
        </li>
        {user?.isAdmin && (
          <>
            <li>
              <Link to="/addVideo">Adicionar Vídeo</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </>
        )}
        <li className={styles.logoutItem}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
