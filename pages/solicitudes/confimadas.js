import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const Confimadas =() => (
  <div>
    <Layout>
    <h1>Solicitudes confirmadas </h1>
    
    <Link href="/solicitudes">Volver</Link>
    </Layout>
  </div>
);
export default Confimadas;