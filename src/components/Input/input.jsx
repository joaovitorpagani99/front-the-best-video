import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Input = ({ types, placeholder, value, onChange }) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      type={types}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  types: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
