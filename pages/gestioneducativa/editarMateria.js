import Layout from "../../components/layout/layout";
import { withRouter, useRouter } from "next/router";
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
const Select = styled.select`
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
margin-left: -5px;
border-radius: 10px;
margin-top: 10px;
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
function editarMateria({ router }) {
  const cambiar = useRouter();
  const [materia, setMaterias] = useState(router.query);
  const [flag, setFlag] = useState(false);
  const [maestros, setMaestros] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getMaestros = () => {
      try {
        firebase.db
          .collection("materias")
          .where("nombre", "==", materia.nombre)
          .where("tipo", "==", materia.tipo)
          .onSnapshot(manejarSnap);
      } catch (error) {
        cambiar.push("/gestioneducativa/Materias", undefined, {
          shallow: true,
        });
      }
    };
    getMaestros();
  }, []);
  function manejarSnap(snap) {
    console.log(materia);
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
        });
      });
    cambiar.push("/gestioneducativa/Materias");
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
           <Li> <label htmlFor="nombre"><lettre>Nombre</lettre></label></Li>
            <Li><Input
              type="text"
              id="nombre"
              name="nombre"
              value={valores.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            /></Li>
            <Li><label htmlFor="tipo"><lettre>Tipo</lettre></label></Li>
            <Li><Select
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
            </Select>
            </Li>
            <h2>Maestros</h2>
          <Maestros />
            <Li><Inpux type="submit" value="EDITAR" /></Li>
          </form>
          
        </>
      </Layout>
    </div>
  );
}
export default withRouter(editarMateria);
