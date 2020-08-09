import Layout from "../components/layout/layout";
import Router from "next/router";
import useValidar from "../hooks/useValidar";
import styled from "@emotion/styled";
import firebase from "../firebase";
import React, { useState } from "react";
import { css } from "@emotion/core";
import validarCrearCuenta from "../validar/validarCrearCuenta";
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";
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
    try {
      await firebase.registrar(nombre, email, password, matricula);
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
          <h1>Crear Cuenta</h1>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="matricula">Matricula</label>
            <input
              type="number"
              id="matricula"
              name="matricula"
              placeholder="Matricula"
              value={matricula}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="email"
              placeholder="correo"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input type="submit" value="Crear cuenta" />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
