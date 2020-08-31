import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import Router from "next/router";
import Link from "next/link";
import firebase, { FirebaseContext } from "../../firebase";
import styled from "@emotion/styled";
import validarMateria from "../../validar/validarMateria";
import useValidar from "../../hooks/useValidar";
import Error from "../../components/ui/Error";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import * as firefire from "firebase";
const Divisor = styled.div`
width=100%;
& > * + *{
  margin-top:10px;
}
`;
const Li = styled.li`
  list-style: none;
  text-align: center;
  margin-left: -25px;
`;
const Linke = styled.button`
width: 400px;
align-items: center;
height: 75px;
text-align: center;
display: center;
list-style: none;
margin-top: 0px;
margin-bottom: 0px;
margin-left: -40px;
padding: 10px 0;
box-shadow: 0px 5px 7px -4px #000000;
border-radius: 10px;
background: #FFFFFF;
border: 1px solid #707070B0 ;
&:hover {
  cursor: pointer;
  }
  &:active {
    color: #006933;
  } 
  &:hover { background:  #f6f6f6;
  }
  &:hover{
    transform: translateX(300px) skewX(-15deg)
    opacity: .6;
    transition: .7s;
    border-radius: 10px;
    }
`;
const IMG = styled.img`
  margin-left: -1200px;
  margin-right: 10px;
  position: left;
  max-widht: 90%;
  margin-top: -80px;
  margin-bottom: -130px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: #006933;
  }
`;
const Input = styled.input`
  width: 300px;
  margin-left: -4px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid 1px #707070;
`;
const Select = styled.select`
  width: 300px;
  margin-left: -4px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid 1px #707070;
`;
const Seelect = styled.select`
  width: 300px;
  margin-left: 35px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid 1px #707070;
`;
const Inpux = styled.input`
  width: 300px;
  text-align: center;
  display: center;
  height: 55px;
  margin-left: -30px;
  border-radius: 10px;
  margin-top: -10px;
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

const Inpuxes = styled.input`
  width: 300px;
  text-align: center;
  display: center;
  height: 55px;
  margin-left: 35px;
  border-radius: 10px;
  margin-top: -10px;
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
const STATE_INICIAL = {
  nombre: "",
  tipo: "",
};
const RegistrarMateria = () => {
  const { usuario } = useContext(FirebaseContext);
  const [mates, setMaterias] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [maestro, setMaestro] = useState("");
  const [validado, setValidado] = useState(false);
  const [docen, setDocentes] = useState([]);
  useEffect(() => {
    const Fn = () => {
      if (usuario) {
        if (usuario.tipo === "admin") {
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
          Router.push("/login", undefined, { shallow: true });
        }
      } else {
        Router.push("/login", undefined, { shallow: true });
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
          materias: firefire.firestore.FieldValue.arrayUnion(nombre),
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
          <Link href="/gestioneducativa">
            <IMG width="40px" src="../static/img/ic_flecha.svg" />
          </Link>
          <h1>Registrar Materia</h1>
        </nav>
        <ul>
          <form onSubmit={handleSubmit} noValidate>
            <Li>
              <lettre>
                <label htmlFor="nombre">Nombre</label>
              </lettre>
            </Li>
            <Li>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Li>
            {errores.nombre && <Error msg={errores.nombre} />}
            <Li>
              <lettre>
                <label htmlFor="tipo">Tipo de materia</label>
              </lettre>
            </Li>
            <Li>
              <Select
                value={tipo}
                onChange={handleChange}
                name="tipo"
                id="tipo"
              >
                <option value="formacion tecnologica">
                  Formación Tecnológica
                </option>
                <option value="habilidades GyD">
                  Habilidades gerenciales y directivas
                </option>
                <option value="lenguas y metodos">Lenguas y métodos</option>
                <option value="formacion cientifica">
                  Formacion científica
                </option>
                <option value="ciencias basicas">Ciencias básicas</option>
              </Select>
            </Li>
            {errores.tipo && <Error msg={errores.tipo} />}
            <Inpux type="submit" value="Crear materia" />
          </form>
        </ul>
        {parche && (
          <form onSubmit={addMaestro} noValidate>
            <Li>
              <Seelect value={maestro} onChange={handleMaestro}>
                <Maestros />
              </Seelect>
            </Li>
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
            <Li>
              <Inpuxes type="submit" value="Añadir maestro" />
            </Li>
          </form>
        )}
        
      </Layout>
    </div>
  );
};

export default RegistrarMateria;
