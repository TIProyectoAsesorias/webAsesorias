import React from 'react'
import Layout from '../../components/layout/layout'
import Link from "next/link"
const GestionEdu =() => (
  <div>
    <Layout>
    <h1>Gestion educativa</h1>
    <Link href="/gestioneducativa/Docentes">Docentes</Link>
    <Link href="/gestioneducativa/Materias">Materias</Link>
    </Layout>
  </div>
);
export default GestionEdu;