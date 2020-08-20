import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const link = styled.nav`
position: flex;

`;

const Espace = styled.div`
padding-top: 3rem;
`;

const Solicitudes =() => (
  <div>
    <Layout>
      <Espace></Espace>
      <nav>
    <h1>Solicitudes</h1>
    <Link href="/solicitudes/pendientes">Pendientes</Link>
    <Link href="/solicitudes/confimadas">Confimadas</Link>
    </nav>
    </Layout>
  </div>
);
export default Solicitudes;