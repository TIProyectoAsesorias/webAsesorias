import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
import styled from "@emotion/styled"
const link = styled.nav`
position: flex;
`;
const IMG = styled.img`
margin-left: -250px;
margin-right: 150px;
position:left;
max-widht: 90%;
&:hover {
  cursor: pointer;
  }
  &:active {
    color: #006933;}
`;

const Nav = styled.nav`
display: flex;
align-items: center;
justify-content: center;
`;
const Confimadas =() => (
  <div>
    <Layout>
      <Nav>
      
    <Link href="/solicitudes"><IMG width="40px" src="../static/img/ic_flecha.svg"/></Link>
    <h1>Solicitudes confirmadas </h1>
    </Nav>
    </Layout>
  </div>
);
export default Confimadas;