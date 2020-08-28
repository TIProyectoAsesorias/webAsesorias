import React from 'react';
const Materia = ({materia,key,fn}) => {
    return (  <div key={key}>
        <Lettre>{materia}</Lettre>
        <button onClick={fn}>Borrar</button>
        </div> );
}
 
export default Materia;