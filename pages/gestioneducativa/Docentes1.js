import React, { useContext, useEffect, useState } from "react";
import * as firefire from "firebase";
import Layout from "../../components/layout/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Cartita from "../../components/ui/Cards";
import { css } from "@emotion/core";
import { FirebaseContext } from "../../firebase";
import { Linke, Li } from "../../components/ui/Botton";
const link = styled.nav`
  position: flex;
`;
const H1 = styled.h1`
  margin-left: -30px;
  margin-top: 80px;
`;
const IMG = styled.img`
  margin-left: -1100px;
  margin-right: 150px;
  margin-top: 100px;
  margin-bottom: -110px;
  position: left;
  max-widht: 90%;
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: #006933;
  }
`;

const GestionEdu = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [maestros, setMaestros] = useState([]);
  const router = useRouter();
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
    firebase.db
      .collection("materias")
      .where("docentes", "array-contains", maestro.nombre)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          doc.ref.update({
            docentes: firefire.firestore.FieldValue.arrayRemove(maestro.nombre),
          });
        });
      });
  }
  function Comprueba() {
    if (usuario.tipo === "maestro" || usuario.tipo === "admin") {
      return null;
    } else {
      router.push("/login");
    }
    return null;
  }
  return (
    <div onMouseEnter={Comprueba}>
      <Layout>
        <nav>
          <Link href="/gestioneducativa">
            <IMG width="40px" src="../static/img/ic_flecha.svg" />
          </Link>
          <H1>Maestros</H1>
          <Li>
            {" "}
            <Link href="/gestioneducativa/Docentes">
              <Linke>
                <lettre>Añadir docente</lettre>
              </Linke>
            </Link>
          </Li>
        </nav>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          <Maestros />
        </div>
      </Layout>
    </div>
  );
};
export default GestionEdu;
