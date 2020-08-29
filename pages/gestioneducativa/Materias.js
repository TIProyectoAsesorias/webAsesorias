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
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    
    return clases.map((clase) =>{ 
      
      return (
      <CardMateria
        key={clase.id}
        materia={clase}
        msgBtt="Borrar materia"
        fn={() => borrar(clase)}
      />
    )});
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
          <h1>Materias</h1>
          <Link href="/gestioneducativa">Volver</Link>
          <Link href="/gestioneducativa/registrarmateria">
            <button>Registrar Materia</button>
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
