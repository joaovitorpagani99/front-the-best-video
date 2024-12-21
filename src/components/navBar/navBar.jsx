import { Link } from "react-router";
import styles from "./styles.module.css";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link to="/dashboard">Ranked Videos</Link>
        </li>
        <li>
          <Link to="/vote">Vote Videos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
