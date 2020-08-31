import React from "react";
const Materia = ({ materia, key, fn }) => {
  return (
    <div key={key}>
      <lettre>{materia}</lettre>
      <button onClick={fn}>Borrar</button>
    </div>
  );
};

export default Materia;
