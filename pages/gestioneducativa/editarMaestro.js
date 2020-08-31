import Layout from "../../components/layout/layout";
import { withRouter, useRouter } from "next/router";
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
const Li = styled.li`
  list-style: none;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 300px;
  margin-left: -4px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: center;
  border: solid 1px #707070;
`;
const Inpux = styled.input`
  width: 300px;
  text-align: center;
  display: center;
  height: 55px;
  margin-left: 5px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  box-shadow: 0px 5px 7px -4px #000000;
  webkit-box-shadow: 0px 5px 7px -4px #000000;
  background: #006933;

  font-family: var(--unnamed-font-family-roboto);
  font-style: var(--unnamed-font-style-regular);
  font-size: var(--unnamed-font-size-30);
  line-height: var(--unnamed-line-spacing-37);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
  &:hover {
    background: linear-gradient(180deg, #01602a 0%, #01602a 100%);
  }
  &:active {
    color: #006933;
  }
`;
function editarMaestro({ router }) {
  const cambiar = useRouter();
  const [maestro, setMaestro] = useState(router.query);

  const [materias, setMaterias] = useState([]);
  const { usuario, firebase } = useContext(FirebaseContext);
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
    });
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
  /*  useEffect(() => {
    const getMaestro = () => {
      firebase.db
        .collection("usuarios")
        .where("nombre", "==", router.query.nombre)
        .where("tipo", "==", "maestro")
        .where("email", "==", router.query.email).onSnapshot(function (snap) {
          const datos=snap.docs.map((doc)=>{
            return doc.data()
          })
          setMaestro(datos[0])
        }
        );
    };
    getMaestro();
  }, [router.query]); */
  useEffect(() => {
    const getMaterias = () => {
      if (usuario) {
        if (usuario.tipo == "admin") {
          try {
            firebase.db
              .collection("usuarios")
              .where("tipo", "==", "maestro")
              .where("nombre", "==", maestro.nombre)
              .onSnapshot(manejarSnapshot);
          } catch (error) {
            cambiar.push("/gestioneducativa/Docentes1", undefined, {
              shallow: true,
            });
          }
        } else {
          cambiar.push("/login", undefined, { shallow: true });
        }
      } else {
        cambiar.push("/login", undefined, { shallow: true });
      }
    };
    getMaterias();
  }, [maestro]);
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
                  <Li>
                    <label htmlFor="nombre">
                      <lettre>Nombre</lettre>
                    </label>
                  </Li>
                  <Li>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={valores.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Li>
                  <Li>
                    <label htmlFor="tutor">
                      <lettre>Tutor</lettre>
                    </label>
                    <input
                      type="checkbox"
                      name="tutor"
                      checked={valores.tutor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Li>
                  <fieldset>
                    <legend>
                      <h2>Horario</h2>
                    </legend>
                    <Li>
                      <label htmlFor="lunes">
                        <lettre>Lunes</lettre>
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
                    </Li>
                    <Li>
                      <label htmlFor="martes">
                        <lettre>Martes</lettre>
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
                    </Li>
                    <Li>
                      <label htmlFor="miercoles">
                        <lettre>Miercoles</lettre>
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
                    </Li>
                    <Li>
                      <label htmlFor="jueves">
                        <lettre>Jueves</lettre>
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
                    </Li>
                    <Li>
                      <label htmlFor="viernes">
                        <lettre>Viernes</lettre>
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
                    </Li>
                  </fieldset>
                  <h2>Materias</h2>
                  <Inpux type="submit" value="EDITAR" />
                </form>

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
