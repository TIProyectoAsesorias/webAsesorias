import React, { useContext, useEffect, useState } from "react";
import * as firefire from "firebase";
import Layout from "../../components/layout/layout";
import Link from "next/link";
import styled from "@emotion/styled";
import Cartita from "../../components/ui/Cards";
import { css } from "@emotion/core";
import { FirebaseContext } from "../../firebase";
const link = styled.nav`
  position: flex;
`;

const GestionEdu = () => {

  const { firebase } = useContext(FirebaseContext);
  const [maestros, setMaestros] = useState([]);
  useEffect(() => {
    const getMaestros = () => {
      firebase.db
        .collection("usuarios")
        .where("tipo", "==", "maestro")
        .onSnapshot(manejarSnapshot);
    };
    getMaestros();
  }, []);
  function manejarSnapshot(snapshot) {
    const maestros = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setMaestros(maestros);
  }

  const Maestros = () => {
    return maestros.map((maestro) => (
      <Cartita
        key={maestro.id}
        maestro={maestro}
        msgBtt="Borrar"
        fn={() => borrar(maestro)}
     
      />
    ));
  };
  function borrar(maestro) {
    firebase.db
      .collection("usuarios")
      .where("email", "==", maestro.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      firebase.db.collection("materias").where("docentes","array-contains",maestro.nombre).get().then(function(snap){
        snap.forEach(function(doc){
          doc.ref.update(
            {docentes:firefire.firestore.FieldValue.arrayRemove(maestro.nombre)}
          );
        })
      })
  }
  return (
    <div>
      <Layout>
        <nav>
          <h1>Maestros</h1>
          <Link href="/gestioneducativa/Docentes">Añadir docente</Link>
        </nav>
        <div
          css={css`
            display: flex;
          `}
        >
          <Maestros />
        </div>
      </Layout>
    </div>
  );
};
export default GestionEdu;
