import React from "react";
import "./style.css";

// Esse componente é bem especifico para o que está sendo usado, mas pode
// facilmente ser refatorado para que seja mais generico e para que tenha um wrapper component que
// lida com a escolha de cor e texto para a tag
const ImportanceTag = props => {
  const getColor = importance => {
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
  };

  const getLabel = importance => {
    if (importance === 2) {
      return "Média";
    }
    if (importance === 3) {
      return "Baixa";
    }
    return "Alta";
  };

  const { importance } = props;
  const style = getColor(importance);
  const label = getLabel(importance);

  return (
    <div className="container" style={style}>
      <span>{label}</span>
    </div>
  );
};

export default ImportanceTag;
