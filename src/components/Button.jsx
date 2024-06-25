import React from "react";
import "../styles/Button.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button className={type} onClick={onClick}>{children}</button>
  );
};

export default Button;
