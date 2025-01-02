import { Link } from "react-router";
import styles from "./styles.module.css";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link to="/dashboard">Vídeos Classificados</Link>
        </li>
        <li>
          <Link to="/vote">Votar em Vídeos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
