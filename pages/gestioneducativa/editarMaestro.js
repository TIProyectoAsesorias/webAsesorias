import Layout from "../../components/layout/layout";
import { withRouter,useRouter } from "next/router";
import { css } from "@emotion/core";
import useValidar from "../../hooks/useValidar";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";
import React, { useState, useContext, useEffect } from "react";
import Materia from "../../components/ui/Materia";
import * as firefire from "firebase";

//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";
const Espace = styled.div`
  padding-top: 7rem;
`;
function editarMaestro({ router }) {
  const cambiar=useRouter();
  const [maestro, setMaestro] = useState(router.query);

  const [materias, setMaterias] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(maestro, validarMaestro, editarMaestro);
  async function editarMaestro() {
    const edicion = {
      nombre: valores.nombre,
      tutor: valores.tutor,
      horario: {
        lunesEntrada: valores.lunesEntrada,
        lunesSalida: valores.lunesSalida,
        martesEntrada: valores.martesEntrada,
        martesSalida: valores.martesSalida,
        miercolesEntrada: valores.miercolesEntrada,
        miercolesSalida: valores.miercolesSalida,
        juevesEntrada: valores.juevesEntrada,
        juevesSalida: valores.juevesSalida,
        viernesEntrada: valores.viernesEntrada,
        viernesSalida: valores.viernesSalida,
      },
    };
   
    firebase.db
      .collection("usuarios")
      .where("nombre", "==", maestro.nombre)
      .where("tipo", "==", "maestro")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          doc.ref.update(edicion);
        });
      });
      setMaestro({
        nombre: valores.nombre,
        tutor: valores.tutor,
        lunesEntrada: valores.lunesEntrada,
        lunesSalida: valores.lunesSalida,
        martesEntrada: valores.martesEntrada,
        martesSalida: valores.martesSalida,
        miercolesEntrada: valores.miercolesEntrada,
        miercolesSalida: valores.miercolesSalida,
        juevesEntrada: valores.juevesEntrada,
        juevesSalida: valores.juevesSalida,
        viernesEntrada: valores.viernesEntrada,
        viernesSalida: valores.viernesSalida,
      })
      cambiar.push("/gestioneducativa/Docentes1");
  }
  const handleMateria = (materia) => {
    const editarMaestro = firebase.db
      .collection("usuarios")
      .where("nombre", "==", maestro.nombre)
      .where("tipo", "==", "maestro")
      .get();
    editarMaestro.then(function (snapshot) {
      snapshot.forEach(function (doc) {
        doc.ref.update({
          materias: firefire.firestore.FieldValue.arrayRemove(materia),
        });
      });
    });
    const editaMateria = firebase.db
      .collection("materias")
      .where("nombre", "==", materia)
      .get();
    editaMateria.then(function (snap) {
      snap.forEach(function (doc) {
        doc.ref.update({
          docentes: firefire.firestore.FieldValue.arrayRemove(maestro.nombre),
        });
      });
    });
  };
  useEffect(() => {
    const getMaterias = () => {
      firebase.db
        .collection("usuarios")
        .where("tipo", "==", "maestro")
        .where("nombre", "==", maestro.nombre)
        .onSnapshot(manejarSnapshot);
    };
    getMaterias();
  }, []);
  function manejarSnapshot(snapshot) {
    const materias = snapshot.docs.map((doc) => {
      return doc.data().materias;
    });

    setMaterias(materias[0]);
  }
  const Materias = () => {
    let key = 0;
    return materias.map((materia) => {
      key = key + 1;
      return (
        <Materia
          materia={materia}
          key={key}
          fn={() => handleMateria(materia)}
        />
      );
    });
  };
  function validarMaestro(valores) {
    let errores = {};
    //validar nombre usuario
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }

    return errores;
  }
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
          {maestro && (
            <>
              <div>
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="nombre">Nombre </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={valores.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="tutor">Tutor</label>
                  <input
                    type="checkbox"
                    name="tutor"
                    checked={valores.tutor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <fieldset>
                    <legend>Horario</legend>
                    <label htmlFor="lunes">
                      Lunes
                      <input
                        type="time"
                        name="lunesEntrada"
                        value={valores.lunesEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        type="time"
                        name="lunesSalida"
                        value={valores.lunesSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                    <label htmlFor="martes">
                      Martes
                      <input
                        type="time"
                        name="martesEntrada"
                        value={valores.martesEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        type="time"
                        name="martesSalida"
                        value={valores.martesSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                    <label htmlFor="miercoles">
                      Miercoles
                      <input
                        type="time"
                        name="miercolesEntrada"
                        value={valores.miercolesEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        type="time"
                        name="miercolesSalida"
                        value={valores.miercolesSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                    <label htmlFor="jueves">
                      Jueves
                      <input
                        type="time"
                        name="juevesEntrada"
                        value={valores.juevesEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        type="time"
                        name="juevesSalida"
                        value={valores.juevesSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                    <label htmlFor="viernes">
                      Viernes
                      <input
                        type="time"
                        name="viernesEntrada"
                        value={valores.viernesEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <input
                        type="time"
                        name="viernesSalida"
                        value={valores.viernesSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </label>
                  </fieldset>
                  <input type="submit" value="EDITAR" />
                </form>
                <h2>Materias</h2>
                <Materias />
              </div>
            </>
          )}
        </>
      </Layout>
    </div>
  );
}

export default withRouter(editarMaestro);