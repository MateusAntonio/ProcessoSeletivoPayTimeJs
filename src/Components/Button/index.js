import React, { Component } from "react";
import "./style.css";

// Esse componente é bem especifico para o que estou usando ele, mas ele pode
// facilmente ser refatorado para ser mais generico e tendo um wrapper component que
// likda com a escolha de cor e texto para a tag
class Button extends Component {
  render() {
    if (this.props.type === "delete") {
      return (
        <button className="btn btn-outline-danger" onClick={this.props.click}>
          {this.props.children}
        </button>
      );
    } else {
      return (
        <button className="btn btn-outline-warning" onClick={this.props.click}>
          {this.props.children}
        </button>
      );
    }
  }
}

export default Button;
