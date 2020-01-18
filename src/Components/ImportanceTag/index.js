import React, { Component } from "react";
import "./style.css";

// Esse componente é bem especifico para o que estou usando ele, mas ele pode
// facilmente ser refatorado para ser mais generico e tendo um wrapper component que
// likda com a escolha de cor e texto para a tag
class ImportanceTag extends Component {
  getColor(importance) {
    if (importance === 2) {
      return "blue";
    }
    if (importance === 3) {
      return "green";
    }
    // default
    return "red";
  }

  getLabel(importance) {
    if (importance === 2) {
      return "Média";
    }
    if (importance === 3) {
      return "Baixa";
    }
    return "Alta";
  }

  render() {
    const { importance } = this.props;
    const intImportance = +importance;

    if (!intImportance) {
      console.warning("Prop importance de tipo nao suportado");
      return <div />;
    }

    const color = this.getColor(intImportance);
    const label = this.getLabel(intImportance);

    return (
      <div className="container" style={{ backgroundColor: color }}>
        <span className="text">{label}</span>
      </div>
    );
  }
}

export default ImportanceTag;
