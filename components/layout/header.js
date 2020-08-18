import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import Navegacion from "./navegacion";
import { FirebaseContext } from "../../firebase";
//margin-top:-50px;
//margin-right: -9px;
// margin-left: 0px;

const Tete = styled.header`
  background-color: var(--verde);
  position: fixed;
  display: flex;
  left: 0px;
  top: 0px;
  right: 0px;
  justify-content: center;
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
  display: left;
`;

//mwh img src
const Butoun = styled.button`
  background: Transparent;
  margin-top: -65px;
  margin-right: 25px;
  margin-left: 0px;
  border: transparent;
  position: static; 
  &:hover {
  cursor: pointer;
  }
`;

const Butoundouex = styled.button`
background: Transparent;
float: right;
position: relative;
left: 770px;
top: 7px;
right:0;
text-align: right;
border: transparent;
&:hover {
cursor: pointer;
}
`;

const Butountrois= styled.headerlettre`
background: Transparent;
border: transparent;
margin-top: 22px;
margin-left: 830px;
margin-right: 0px;
margin-bottom: -20px;
display: inline;
text-align: center;
position: static;
vertical-align: middle;
display: inline-block;
list-style-type: none;

li {
  display: center;
  margin-left: 40px;
  font-family: var(--unnamed-font-family-roboto);
  font-style: var(--unnamed-font-style-regular);
  font-size: var(--unnamed-font-size-30);
  line-height: var(--unnamed-line-spacing-37);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-f1f1f1);
  vertical-align: middle;
  }
`;

const ING = styled.img`
background: Transparent;
border: transparent;
float: left;
margin-right: 10px;
margin-left: 6px;
margin-top: -10px;
text-align: center;
position: static;
vertical-align: middle;
display: inline-block;
list-style-type: none;
`;


const Header = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  return (
    <Tete>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
        role="existir"
      >
       
        <IMG src="../static/img/AS.svg" Alt="AQUI VA UNA IMAGEN" />
       
        {usuario ? (
          < >
         
        <Butoundouex  >
        <img width="57px" src="../static/img/mensage.svg" />
        </Butoundouex>

        
        <Butountrois  width="57px">
          
        <headerlettre data-testid="user">Hola {usuario.nombre}
        <ING width="57px" src="../static/img/usuario.svg" />
          </headerlettre> 
        </Butountrois>
        

        <Navegacion />{" "}


        <Butoun onClick={() => firebase.logOut()}>
          <img width="60px" src="../static/img/salirsesion.svg" />
        </Butoun>
          
            
          </>
        ) : (
          <>
            <div>
              <Link href="/">
                <h1></h1>
              </Link>
              <>
                <Link href="/login">
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