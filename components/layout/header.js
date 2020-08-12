import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import Navegacion from "./navegacion";
import { FirebaseContext } from "../../firebase";

const Tete = styled.header`
  background-color: var(--verde);
  padding: 0 0 0;
  margin: 0 0 0;
  box-shadow: 0px 5px 7px -4px #000000;
  -webkit-box-shadow: 0px 5px 7px -4px #000000; 
  h1 {
    font-family: Roboto, sans-serif;
  }
  `;

const IMG = styled.img`
  height: 52px;
  margin-top: 15px;
  margin-left: 28px;
  margin-bottom: 2px;
`;

//mwh img src
const Butoun = styled.button`
  background: Transparent;
  margin-top: 15;
  margin-left: 10px;
  border: transparent;
  &:hover {
  cursor: pointer;
  }
`;

const Header = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
console.log(usuario)
  return (
    <Tete>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <IMG src="../static/img/AS.svg" Alt="AQUI VA UNA IMAGEN" />

        {usuario ? (
          <>
            <p>Hola {usuario.displayName}</p> 
            <Navegacion />{" "}
            <Link href="/">
          <li> Mensajes </li>
        </Link>
            <Butoun onClick={() => firebase.logOut()}>
              <img src="../static/img/salirsesion.svg" />
            </Butoun>
          </>
        ) : (
          <>
            <div>
              <Link href="/">
                <h1></h1>
              </Link>
              <>
                <Link href="/">
                  <a>Login</a>
                </Link>
                <Link href="/crear-cuenta">
                  <a>Crear cuenta</a>
                </Link>
              </>
            </div>
          </>
        )}
      </div>
    </Tete>
  );
};
export default Header;