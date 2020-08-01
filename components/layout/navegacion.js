import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
const Navegacion = () => {
    return ( <nav>
        <Link href="/solicitudes">Solicitudes</Link>
        <Link href="/gestioneducativa">Gestion Educativa</Link>
        <Link href="/">Mensajes</Link>
    </nav> );
}
 
export default Navegacion;