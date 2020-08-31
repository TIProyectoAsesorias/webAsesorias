import React, { useContext, useEffect, useState } from "react";
import * as firefire from "firebase";
import Layout from "../../components/layout/layout";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";
import CardMateria from "../../components/ui/CardMateria";
const link = styled.nav`
  position: flex;
`;

const Linke = styled.button`
width: 381px;
align-items: center;
height: 75px;
text-align: center;
display: center;
list-style: none;
margin-top: 0px;
margin-bottom: 20px;
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

const Espace = styled.div`
  padding-top: 3rem;
`;

const Li = styled.li`
  list-style: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const IMG = styled.img`
  margin-left: -1200px;
  margin-right: 10px;
  position: left;
  max-widht: 90%;
  margin-top: 80px;
  margin-bottom: -130px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: #006933;
  }
`;
const Materias = () => {
  const { firebase } = useContext(FirebaseContext);
  const [clases, setClases] = useState([]);
  useEffect(() => {
    const getMaterias = () => {
      firebase.db.collection("materias").onSnapshot(function (snap) {
        const materias = snap.docs.map(function (doc) {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setClases(materias);
      });
    };
    getMaterias();
  }, []);
  const Clases = () => {
    return clases.map((clase) => {
      return (
        <CardMateria
          key={clase.id}
          materia={clase}
          msgBtt="Borrar materia"
          fn={() => borrar(clase)}
        />
      );
    });
  };
  function borrar(clase) {
    firebase.db
      .collection("materias")
      .where("nombre", "==", clase.nombre)
      .get()
      .then(function (snap) {
        snap.forEach((doc) => {
          doc.ref.delete();
        });
      });
    firebase.db
      .collection("usuarios")
      .where("materias", "array-contains", clase.nombre)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          doc.ref.update({
            materias: firefire.firestore.FieldValue.arrayRemove(clase.nombre),
          });
        });
      });
  }
  return (
    <div>
      <Layout>
        <nav>
          <Link href="/gestioneducativa">
            <IMG width="40px" src="../static/img/ic_flecha.svg" />
          </Link>
          <h1>Materias</h1>
          <Link href="/gestioneducativa/registrarmateria">
            <Linke>
              <lettre>Registrar Materia</lettre>
            </Linke>
          </Link>
        </nav>
        <Wrapper>
          <Clases />
        </Wrapper>
      </Layout>
    </div>
  );
};
export default Materias;
