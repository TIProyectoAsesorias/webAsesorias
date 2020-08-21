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
  const { usuario } = useContext(FirebaseContext);
  console.log(usuario.tipo)
  const [maestros, setMaestros] = useState([]);
  const [maestro, setMaestro] = useState("");
  const [validado, setValidado] = useState(false);
  useEffect(() => {
    const Fn = () => {
      
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
  } = useValidar(STATE_INICIAL, validarMateria, crearMateria);
  const { nombre, tipo } = valores;
console.log(submitForm);
   function crearMateria() {
    const materia = {
      nombre,
      tipo,
      docentes: [],
    };
    try {
      firebase.db.collection("materias").add(materia);
      console.log("C")
    } catch (error) {
      console.error("Error", error.message);
    }
  }
  function addMaestro() {
    e.preventDefault();
    firebase
      .collection("materias")
      .where("nombre", "==", nombre)
      .get()
      .then(function (snapshot) {
        snapshot.forEach(function (doc) {
          doc.ref.update({
            docentes: [...docentes, maestro],
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

        {<form onSubmit={addMaestro} noValidate>
          <select value={maestro} onChange={handleMaestro} >
            <Maestros />
          </select>
          <input type="submit" value="Añadir maestro" />
        </form>}

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
              Maestro agregado, Dame click para poder agregar otro maestro
            </Alert>
          </Collapse>
        </Divisor>
      </Layout>
    </div>
  );
};

export default RegistrarMateria;
