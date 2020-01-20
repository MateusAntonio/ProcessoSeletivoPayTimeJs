import React, { Component } from "react";
import "./style.css";

// Esse componente é bem especifico para o que está sendo usado, mas pode
// facilmente ser refatorado para ser mais generico e ter um wrapper component que
// lida com a escolha de cor e texto para a tag
class Button extends Component {
  render() {
    let btnProps = "";
    if (this.props.type === "delete") {
      btnProps = "btn btn-outline-danger";
    }
    if (this.props.type === "edit") {
      btnProps = "btn btn-outline-warning";
    }
    if (this.props.type === "new") {
      btnProps = "btn btn-outline-primary";
    }
    return (
      <button className={btnProps} onClick={this.props.click}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
