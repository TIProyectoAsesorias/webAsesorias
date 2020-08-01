import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const Docentes =() => (
  <div>
    <Layout>
    <h1>Materias</h1>
    <Link href="/gestioneducativa">Volver</Link>
    <a>Registrar Docentes</a>
    <ul>
        <li><a>Docente</a></li>
    </ul>
    </Layout>
  </div>
);
export default Docentes;