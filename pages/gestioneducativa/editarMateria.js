import Layout from "../../components/layout/layout";
import { withRouter,useRouter } from "next/router";
import { css } from "@emotion/core";
import useValidar from "../../hooks/useValidar";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";
import React, { useState, useContext, useEffect } from "react";
import * as firefire from "firebase";
import Maestro from "../../components/ui/Maestro";
const Espace = styled.div`
  padding-top: 7rem;
`;
function editarMateria({ router }) {
    const cambiar=useRouter();
  const [materia, setMaterias] = useState(router.query);
  const [flag,setFlag]=useState(false);
  const [maestros, setMaestros] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getMaestros = () => {


      firebase.db
        .collection("materias")
        .where("nombre", "==", materia.nombre).where("tipo", "==", materia.tipo)
        .onSnapshot(manejarSnap);
    };
    getMaestros();
  }, []);
  function manejarSnap(snap) {
    console.log(materia)
    const maestros = snap.docs.map((doc) => {
      return doc.data().docentes;
    });
   
    setMaestros(maestros[0]);
  }
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(materia, validarMateria, editarMateria);
  async function editarMateria() {
    const edicion = {
      nombre: valores.nombre,
      tipo: valores.tipo,
    };
setMaterias(edicion);
    firebase.db
      .collection("materias")
      .where("nombre", "==", materia.nombre)
      .where("tipo", "==", materia.tipo)
      .get()
      .then(function (snap) {
          snap.forEach(function (doc) {
              doc.ref.update(edicion);
          })
      });
      cambiar.push("/gestioneducativa/Materias")
    
  }
  function validarMateria(valores) {
    let errores = {};
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }
    return errores;
  }
  const Maestros = () => {
    let key = 0;
    return maestros.map((maestro) => {
      key = key + 1;
      return (
        <Maestro
          maestro={maestro}
          key={key}
          fn={() => handleMaestro(maestro)}
        />
      );
    });
  };
  const handleMaestro = (maestro) => {
    firebase.db
      .collection("materias")
      .where("nombre", "==", materia.nombre)
      .where("tipo", "==", materia.tipo)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          doc.ref.update({
            docentes: firefire.firestore.FieldValue.arrayRemove(maestro),
          });
        });
      });
  };
  return (
    <div>
      <Espace></Espace>
      <Layout>
        <>
          <div
            css={css`
              display: flex;
            `}
          ></div>
          <h2>Editar maestro</h2>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={valores.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="tipo">Tipo</label>
            <select
              value={valores.tipo}
              onChange={handleChange}
              name="tipo"
              id="tipo"
            >
              <option value="formacion tecnologica">
                Formacion Tecnologica
              </option>
              <option value="habilidades GyD">
                Habilidades gerenciales y directivas
              </option>
              <option value="lenguas y metodos">Lenguas y metodos</option>
              <option value="formacion cientifica">Formacion cientifica</option>
              <option value="ciencias basicas">Ciencias basicas</option>
            </select>
            <input type="submit" value="EDITAR" />
          </form>
          <h2>Maestros</h2>
          <Maestros />
        </>
      </Layout>
    </div>
  );
}
export default withRouter(editarMateria);
