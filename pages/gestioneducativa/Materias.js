import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const Materias =() => (
  <div>
    <Layout>
    <h1>Materias</h1>
    <Link href="/gestioneducativa">Volver</Link>
    <button>Registrar Materia</button>
    <ul>
        <li><button>Materia</button></li>
    </ul>
    </Layout>
  </div>
);
export default Materias;