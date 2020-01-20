import React from "react";
import "./style.css";

// Esse componente é bem especifico para o que está sendo usado, mas pode
// facilmente ser refatorado para ser mais generico e ter um wrapper component que
// lida com a escolha de cor e texto para a tag
const Button = props => {
  const { type, children, click } = props;

  let btnProps = "";
  if (type === "delete") {
    btnProps = "btn btn-outline-danger";
  }
  if (type === "edit") {
    btnProps = "btn btn-outline-warning";
  }
  if (type === "new") {
    btnProps = "btn btn-outline-primary";
  }

  return (
    <button className={btnProps} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
