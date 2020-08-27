import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import Router from "next/router";
import Link from "next/link";
import firebase,{ FirebaseContext } from "../../firebase";
import styled from "@emotion/styled";
import validarMateria from "../../validar/validarMateria";
import useValidar from "../../hooks/useValidar";
import Error from "../../components/ui/Error";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import * as firefire from 'firebase';
const Divisor = styled.div`
width=100%;
& > * + *{
  margin-top:10px;
}
`;
const STATE_INICIAL = {
  nombre: "",
  tipo: "",
};
const RegistrarMateria = () => {
  const { usuario} = useContext(FirebaseContext);
  const [mates, setMaterias] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [maestro, setMaestro] = useState("");
  const [validado, setValidado] = useState(false);
  const [docen, setDocentes] = useState([]);
  useEffect(() => {
    const Fn = () => {
      if (usuario.tipo == "admin" || usuario.tipo === "maestro") {
        firebase.db
          .collection("usuarios")
          .where("tipo", "==", "maestro")
          .onSnapshot(function (snapshot) {
            const maestros = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            setMaestros(maestros);
          });
      } else {
        Router.push("/");
      }
    };
    Fn();
  }, []);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
    parche,
  } = useValidar(STATE_INICIAL, validarMateria, crearMateria);
  const { nombre, tipo } = valores;

  function crearMateria() {
    const materia = {
      nombre,
      tipo,
      docentes: [],
    };
    try {
      firebase.db.collection("materias").add(materia);
    } catch (error) {
      console.error("Error", error.message);
    }
  }
  function addMaestro(e) {
    e.preventDefault();
 
      const docentes = firebase.db
        .collection("usuarios")
        .where("nombre", "==", maestro)
        .where("tipo", "==", "maestro")
        .get();
      docentes.then(function (snapshot) {
        snapshot.forEach(function (doc) {
          doc.ref.update({
            materias: firefire.firestore.FieldValue.arrayUnion(nombre)
          });
        });
      });
      const materias = firebase.db
        .collection("materias")
        .where("nombre", "==", nombre)
        .get();
      materias.then(function (snapshot) {
        snapshot.forEach(function (doc) {
          doc.ref.update({
            docentes: firefire.firestore.FieldValue.arrayUnion(maestro),
          });
        });
      });
    

    setValidado(true);
  }
  const Maestros = () => {
    return maestros.map((maestro) => {
      return <option value={maestro.nombre}>{maestro.nombre}</option>;
    });
  };
  const handleMaestro = (e) => {
    setMaestro(e.target.value);
  };
  return (
    <div>
      <Layout>
        <nav>
          <h1>Registrar Materia</h1>
          <Link href="/gestioneducativa">Volver</Link>
          <ul>
            <li>
              <button>Materia</button>
            </li>
          </ul>
        </nav>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errores.nombre && <Error msg={errores.nombre} />}
          <label htmlFor="tipo">Tipo de materia</label>
          <select value={tipo} onChange={handleChange} name="tipo" id="tipo">
            <option value="formacion tecnologica">Formacion Tecnologica</option>
            <option value="habilidades GyD">
              Habilidades gerenciales y directivas
            </option>
            <option value="lenguas y metodos">Lenguas y metodos</option>
            <option value="formacion cientifica">Formacion cientifica</option>
            <option value="ciencias basicas">Ciencias basicas</option>
          </select>
          {errores.tipo && <Error msg={errores.tipo} />}
          <input type="submit" value="Crear materia" />
        </form>
        {parche && (
          <form onSubmit={addMaestro} noValidate>
            <select value={maestro} onChange={handleMaestro}>
              <Maestros />
            </select>
            <input type="submit" value="Añadir maestro" />
          </form>
        )}

        <Divisor>
          <Collapse in={validado}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setValidado(false);
                    setMaestro("");
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Maestro agregado, cierra este mensaje para agregar otro
            </Alert>
          </Collapse>
        </Divisor>
      </Layout>
    </div>
  );
};

export default RegistrarMateria;
