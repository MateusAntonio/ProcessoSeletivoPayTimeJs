import React, { Component } from "react";
import "./style.css";

// Esse componente é bem especifico para o que estou usando ele, mas ele pode
// facilmente ser refatorado para ser mais generico e tendo um wrapper component que
// likda com a escolha de cor e texto para a tag
class ImportanceTag extends Component {
  getColor(importance) {
    let style = {
      color: "#fa541c",
      backgroundColor: "#fff2e8",
      borderColor: "#ffbb96"
    };
    if (importance === 2) {
      style = {
        color: "#2f54eb",
        backgroundColor: "#f0f5ff",
        borderColor: "#adc6ff"
      };
      return style;
    }
    if (importance === 3) {
      style = {
        color: "#52c41a",
        backgroundColor: "#f6ffed",
        borderColor: "#b7eb8f"
      };
      return style;
    }
    // default
    return style;
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

    const style = this.getColor(intImportance);
    const label = this.getLabel(intImportance);

    return (
      <div className="container" style={style}>
        <span>{label}</span>
      </div>
    );
  }
}

export default ImportanceTag;
