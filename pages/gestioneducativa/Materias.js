import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const link = styled.nav`
position: flex;
`;
const Materias =() => (
  <div>
    <Layout>
      <nav>
    <h1>Materias</h1>
    <Link href="/gestioneducativa">Volver</Link>
    <button>Registrar Materia</button>
    <ul>
        <li><button>Materia</button></li>
    </ul>
    </nav>
    </Layout>
  </div>
);
export default Materias;