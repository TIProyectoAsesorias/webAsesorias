import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"

const link = styled.nav`
position: flex;
`;

const Linke = styled.button`
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
  &:active {
    color: #006933;
  } 
  &:hover { background:  #f6f6f6;
  }
`;

const Espace = styled.div`
padding-top: 3rem;
`;

const Li = styled.li`
list-style: none;
`;


const Solicitudes =() => (
  <div>
    <Layout>
      <Espace></Espace>
      <nav>
    <h1>Solicitudes</h1>
    <ul>
    <Li><Linke><Link href="/solicitudes/pendientes"><lettre>Pendientes</lettre></Link></Linke></Li>
    
    <Li><Linke><Link href="/solicitudes/confimadas"><lettre>Confirmadas</lettre></Link></Linke></Li>
    </ul>
    </nav>
    </Layout>
  </div>
);
export default Solicitudes;