import { useState } from "react";
import { Link } from "react-router";
import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";

const Menu = () => {
  const { signout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.menu}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`${styles.menuList} ${isMenuOpen ? styles.showMenu : ""}`}>
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
