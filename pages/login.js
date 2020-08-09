import Layout from "../components/layout/layout";
import Router from "next/router";
import useValidar from "../hooks/useValidar";
import styled from "@emotion/styled";
import firebase from "../firebase";
import React, { useState } from "react";
import { css } from "@emotion/core";
import validarLogin from "../validar/validarLogin";
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";
const STATE_INICIAL = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, setError] = useState(false);
  const {
    valores,
    errores,

    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(STATE_INICIAL, validarLogin, logIn);
  const { password, email } = valores;
  async function logIn() {
    try {
      await firebase.login(email, password);
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit} noValidate>
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
            <input type="submit" value="Login" />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default Login;
