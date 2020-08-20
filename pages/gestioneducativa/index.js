import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const Linke = styled.nav`
position: flex;
margin-top: 100px;
`;
const Espace = styled.div`
padding-top: 3rem;
`;
const GestionEdu =() => (
  <div>
    <Layout>
    <Espace></Espace>
    <nav>
    <h1>Gestión educativa</h1>
    <Linke href="/gestioneducativa/Docentes">Docentes</Linke>
    <Linke href="/gestioneducativa/Materias">Materias</Linke>
    </nav>
    </Layout>
  </div>
);
export default GestionEdu;