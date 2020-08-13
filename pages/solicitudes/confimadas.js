import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const link = styled.nav`
position: flex;
`;
const Confimadas =() => (
  <div>
    <Layout>
      <nav>
    <h1>Solicitudes confirmadas </h1>
    <Link href="/solicitudes">Volver</Link>
    </nav>
    </Layout>
  </div>
);
export default Confimadas;