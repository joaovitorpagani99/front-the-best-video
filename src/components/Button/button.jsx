import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Button = ({ types, onClick, text }) => {
  return (
    <button className={styles.button} type={types} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  types: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
