import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const Pendientes =() => (
  <div>
    <Layout>
    <h1>Pendientes </h1>
    
    <Link href="/solicitudes">Volver</Link>
    </Layout>
  </div>
);
export default Pendientes;