import React from 'react'
import Layout from '../components/layout/layout'
import styled from "@emotion/styled"

const Navo = styled.nav`
margin-top: 100px;
position:flex;
  `;

const Home =() => (
  

  <div >
    <Layout>
     <Navo><h1>¡Bienvenido a AS!</h1></Navo>
     <h2 align="center">Agenda tus sesiones de estudio,
        </h2>
     <h2 align="center">
     repasa con ejercicios
         </h2>
     <h2 align="center">y más...</h2>
    </Layout>
  </div>
);
export default Home;
