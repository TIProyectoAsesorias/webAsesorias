import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const link = styled.nav`
position: flex;
`;

const GestionEdu =() => (
  <div>
    <Layout>
    <nav>
    <h1>Gestion educativa</h1>
    <Link href="/gestioneducativa/Docentes">Docentes</Link>
    <Link href="/gestioneducativa/Materias">Materias</Link>
    </nav>
    </Layout>
  </div>
);
export default GestionEdu;