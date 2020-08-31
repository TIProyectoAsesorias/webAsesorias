import React, { useEffect, useContext } from "react";
import Layout from "../../components/layout/layout";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
const Linke = styled.button`
position: flex;
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
  border-radius: 10px;
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

const GestionEdu = () => {
  const { usuario } = useContext(FirebaseContext);
  const cambiar = useRouter();
  useEffect(() => {
    const comprueba= () => {
    if(usuario) { if (usuario.tipo == "admin") {
        return null;
      } else {
        cambiar.push("/login", undefined, { shallow: true });
      }}else{
        cambiar.push("/login", undefined, { shallow: true });
      }
    };
    comprueba();
  }, []);
  return (
    <div>
      <Layout>
        <Espace></Espace>
        <nav>
          <h1>Gestión educativa</h1>
          <Li>
            <Link href="/gestioneducativa/Docentes1">
              <Linke>
                <lettre>Docentes</lettre>
              </Linke>
            </Link>
          </Li>
          <Li>
            <Link href="/gestioneducativa/Materias">
              <Linke>
                <lettre>Materias</lettre>
              </Linke>
            </Link>
          </Li>
        </nav>
      </Layout>
    </div>
  );
};
export default GestionEdu;
