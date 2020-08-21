import Layout from "../components/layout/layout";
import Router from "next/router";
import useValidar from "../hooks/useValidar";
import styled from "@emotion/styled";
import firebase from "../firebase";
import React, { useState } from "react";
import { css } from "@emotion/core";
import validarCrearCuenta from "../validar/validarCrearCuenta";
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";

const Form = styled.form`
margin: 180px auto;
width:300px;
height: 445px;
position:relative;
bottom: -100px;
padding: 20px 30px;
background-color: #F6F6F6;
border-radius: 10px;
box-shadow: 0 0 7px 0 #000;
margin: auto;
`;

const Label = styled.label`
margin-top: -20px;
display: flex;
flex-direction: row;
margin-left: -30px;
width: 336px;
background-color: #006933;
border-radius: 10px 10px 0px 0px;
box-shadow: 0 0 7px 0 #000;
display: block;
text-align:center;
color: white;
padding: 12px ;
font-family: var(--unnamed-font-family-roboto);
font-style: var(--unnamed-font-style-regular);
font-size: 21px;
line-height: var(--unnamed-line-spacing-37);
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--unnamed-color-#000000B8);
`;

const Input = styled.input`
width: 300px;
margin-left: -4px;
height: 40px;
border-radius: 10px;
text-align: center;
border: solid 1px #707070;
`;

const Ul = styled.ul`
margin-left: -36px;
margin-top: 20px;
`;

const Inpux = styled.input`
width: 361px;
text-align: center;
display: center;
height: 55px;
margin-left: -34px;
border-radius: 10px;
margin-top: 30px;
margin-bottom: -55px;
background: linear-gradient(180deg, #D9D9D9 0%, #999999 100%);
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
    &:hover{
      background: linear-gradient(180deg,#D9D9D9  0%, #D9D9D9 100%)
      }
      &:active {
        color: #006933;
      } 
`;
const STATE_INICIAL = {
  nombre: "",
  matricula: "",
  email: "",
  password: "",
};
const CrearCuenta = () => {
  const [error, setError] = useState(false);
  const {
    valores,
    errores,

    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  const { nombre, email, password, matricula } = valores;
  async function crearCuenta() {
    const usuario = {
      nombre, 
      email, 
      matricula, 
      tipo: "alumno",
    };
    try {
      await firebase.registrar(nombre, email, password);
      await firebase.db.collection("usuarios").add(usuario)
      Router.push("/");
    } catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
         <Form action = "" onSubmit={handleSubmit} noValidate> 
           <Label for="">Crear Cuenta  </Label>
           <Ul>
            <label htmlFor="Nombre"><lettre>Nombre</lettre></label>

             <Input
              type="text"
              id="nombre"
              name="nombre"
              placeholder=""
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
           
            <label htmlFor="matricula"><lettre>Matrícula</lettre></label>
            <Input
              type="number"
              id="matricula"
              name="matricula"
              placeholder=""
              value={matricula}
              onChange={handleChange}
              onBlur={handleBlur}/>
            
            <label htmlFor="password"><lettre>Contraseña</lettre></label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="correo"><lettre>Correo Electrónico</lettre></label>
            <Input
              type="email"
              id="email"
              placeholder=""
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Inpux type="submit" value="Confirmar" />

            </Ul>
          </Form>
         
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
