import Layout from "../components/layout/layout";
import Router from "next/router";
import useValidar from "../hooks/useValidar";
import styled from "@emotion/styled";
import firebase from "../firebase";
import React, { useState } from "react";

import { css } from "@emotion/core";
import validarLogin from "../validar/validarLogin";
import Error from "../components/ui/Error";
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";

const Form = styled.form`
  margin: 180px auto;
  width: 300px;
  height: 267px;
  top: 180px;
  position: relative;
  padding: 20px 30px;
  background-color: #f6f6f6;
  border-radius: 10px;
  box-shadow: 0 0 7px 0 #000;
  margin: auto;
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

const Inpux = styled.input`
  width: 361px;
  text-align: center;
  display: center;
  height: 55px;
  margin-left: -30px;
  border-radius: 10px;
  margin-top: 18px;
  margin-bottom: -55px;
  background: linear-gradient(180deg, #d9d9d9 0%, #999999 100%);
  border: none;
  font-family: var(--unnamed-font-family-roboto);
  font-style: var(--unnamed-font-style-regular);
  font-size: var(--unnamed-font-size-30);
  line-height: var(--unnamed-line-spacing-37);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-#000000B8);
  &:hover {
    cursor: pointer;
  }
  &:hover {
    background: linear-gradient(180deg, #d9d9d9 0%, #d9d9d9 100%);
  }
  &:active {
    color: #006933;
  }
`;

const IMG = styled.img`
  margin-right: 10px;
  margin-left: -30px;
`;
const IMGe = styled.img`
  margin-right: 35px;
  margin-left: -50px;
`;
const Label = styled.label`
  margin-left: 10px;
  vertical-align: top;
  position: center;
  margin-bottom: 50px;
  margin-top: 50px;
  padding-bottom: 50px;
`;
const Labele = styled.label`
  margin-left: 0px;
  vertical-align: top;
  position: center;
  margin-bottom: 60px;
  margin-top: 50px;
  padding-bottom: 50px;
`;
const STATE_INICIAL = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, setError] = useState(false);
  const [maestro, setMaestro] = useState();
  const {
    valores,
    errores,

    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(STATE_INICIAL, validarLogin, logIn);
  const { password, email } = valores;
  function manejarSnapshot(snapshot) {
    const usuario = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setMaestro(usuario[0]);
  }

  async function logIn() {
    try {
      firebase.db
        .collection("usuarios")
        .where("email", "==", email)
        .where("tipo", "==", "maestro")
        .onSnapshot(manejarSnapshot);
      if (maestro) {
        try{
        await firebase.login(email, password);
        Router.push("/");
      }
        catch(error){
        await firebase.registrar(maestro.nombre, email, password);
        Router.push("/");}
      } 
      else {
        await firebase.login(email, password);
        Router.push("/");}
      
    } 
    catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  }
  return (
    <div>
      <Layout>
        <>
          <Form onSubmit={handleSubmit} noValidate>
            <label htmlFor="correo">
              <lettre>
                <IMG width="40px" src="../static/img/ic_usuario.svg" />
                <Label>Correo Electrónico</Label>
              </lettre>
            </label>
            <Input
              type="email"
              id="email"
              placeholder=""
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="password">
              <lettre>
                <IMGe width="40px" src="../static/img/ic_key.svg" />
                <Labele>Contraseña</Labele>
              </lettre>
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
<<<<<<< HEAD
            <Inpux type="submit" value="Iniciar sesión" />
          </Form>
=======
            {errores.password && <Error msg={errores.password} />}
            
            
            
            <Inpux type="submit" value="Iniciar sesión" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default Login;
