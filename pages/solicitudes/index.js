import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const Solicitudes =() => (
  <div>
    <Layout>
    <h1>Solicitudes</h1>
    <Link href="/solicitudes/pendientes">Pendientes</Link>
    <Link href="/solicitudes/confimadas">Confimadas</Link>
    </Layout>
  </div>
);
export default Solicitudes;