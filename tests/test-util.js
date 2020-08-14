import {render} from '@testing-library/react';
const Renderizador=({props})=>{
    return(<> <main>{props.children}</main> </>);
}
export default Renderizador;