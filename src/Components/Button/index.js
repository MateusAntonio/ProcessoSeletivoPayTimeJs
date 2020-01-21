import React from "react";
import "./style.css";

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
