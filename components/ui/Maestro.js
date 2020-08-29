import React from 'react';
const Maestro = ({maestro,key,fn}) => {
    return (  <div key={key}>
        <lettre>{maestro}</lettre>
        <button onClick={fn}>Borrar</button>
        </div> );
}
 
export default Maestro;