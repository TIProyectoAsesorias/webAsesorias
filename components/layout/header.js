import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import Navegacion from "./navegacion";
import { FirebaseContext } from "../../firebase";

const Tete = styled.header`
  align-items: center;
  background-color: var(--verde);
  position: fixed;
  height: 70px;
  overflow:hidden;
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
  margin-top: 2px;
  margin-left: -640px;
  margin-bottom: 2px;
  display: left;
`;

const IMGE = styled.img`
  height: 52px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-right: 800px;
  display: left;
`;

//mwh img src
const Butoun = styled.button`
  background: Transparent;
  margin-top: -85px;
  margin-right: 25px;
  margin-left: 0px;
  border: transparent;
  position: static; 
  &:hover {
  cursor: pointer;
  }
  &:active {
    color: #006933;}
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
&:active {
  color: #006933;}
`;

const Butountrois= styled.Headerlettre`
background: Transparent;
border: transparent;
margin-top: -65px;
margin-left: 1010px;
margin-right: 0px;
margin-bottom: -10px;
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

const Begineres = styled.Headerlettre`
position: block;
float: right;
margin-top: -40px;
margin-left: 190px;
margin-right: -880px;
margin-down: 1030px;
text-align:center;
&:hover {
  cursor: pointer;
  }
  &:active {
    color: #006933;}
`; 
const Beginer = styled.Headerlettre`
float: right;
margin-top: -40px;
margin-left: 0px;
margin-right: -1040px;
text-align:center;
&:hover {
  cursor: pointer;
  }
  &:active {
    color: #006933;}
`; 

//usuario imagen y saludo al
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

        {usuario ? (
          
        < >
        <IMGE src="../static/img/AS.svg" Alt="AQUI VA UNA IMAGEN" />
        
        <Butountrois  width="57px">
        <Headerlettre data-testid="user">Hola {usuario.nombre}
        <ING width="57px" src="../static/img/usuario.svg" />
        </Headerlettre> 
        </Butountrois>
        
        <Navegacion />{" "}

        <Butoun onClick={() => firebase.logOut()}>
        <img width="60px" src="../static/img/salirsesion.svg"/>
        </Butoun>  
          </>
        ) : (
          <>
          <IMG src="../static/img/AS.svg" Alt="AQUI VA UNA IMAGEN"/>
            <div>
            
              <Link href="/">
            
                <h1></h1>
              </Link>
              <>
              <Begineres>
                <Link text-align="center" href="/login">
                  <Headerlettre>Iniciar sesión</Headerlettre>
                </Link>
                </Begineres>
                <Beginer>
                <Link href="/crear-cuenta">
                  <Headerlettre>Crear cuenta</Headerlettre>
                </Link>
                </Beginer>
              </>
              
            </div>
          </>
        )}
      </div>
    </Tete>
  );
};

export default Header;