import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const Linke = styled.button`
position: flex;
width: 381px;
align-items: center;
height: 75px;
text-align: center;
display: center;
list-style: none;
margin-top: 0px;
margin-bottom: 20px;
margin-left: -40px;
padding: 10px 0;
box-shadow: 0px 5px 7px -4px #000000;
border-radius: 10px;
background: #FFFFFF;
border: 1px solid #707070B0 ;
&:hover {
  cursor: pointer;
  }
`;

const Espace = styled.div`
padding-top: 3rem;
`;
const Li = styled.li`
list-style: none;
`;

const GestionEdu =() => (
  <div>
    <Layout>
    <Espace></Espace>
    <nav>
    <h1>Gestión educativa</h1>
    <Li><Linke href="/gestioneducativa/Docentes"><lettre>Docentes</lettre></Linke></Li>
    <Li><Linke href="/gestioneducativa/Materias"><lettre>Materias</lettre></Linke></Li>
    </nav>
    </Layout>
  </div>
);
export default GestionEdu;