import Layout from "../../components/layout/layout";
import Router, { useRouter } from "next/router";
import useValidar from "../../hooks/useValidar";
import styled from "@emotion/styled";
import firebase, { FirebaseContext } from "../../firebase";
import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import validarMaestro from "../../validar/validarMaestro";
import Cartita from "../../components/ui/Cards";
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";
const STATE_INICIAL = {
  nombre: "",
  password: "",
  email: "",
  tutor:false,
};
const Docentes = () => {
  const [error, setError] = useState(false);
  const [horario, setHorario] = useState({
    lunesEntrada: "",
    lunesSalida: "",
    martesEntrada: "",
    martesSalida: "",
    miercolesEntrada: "",
    miercolesSalida: "",
    juevesEntrada: "",
    juevesSalida: "",
    viernesEntrada: "",
    viernesSalida: "",
  });
  const [dias, setDias] = useState({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
  });
  const onChin = (e) => {
    setHorario({ ...horario, [e.target.name]: e.target.value });
  };
  
  const handleCheck = (e) => {
    setDias({ ...dias, [e.target.name]: e.target.checked });
  };
  const {
    valores,
    errores,

    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(STATE_INICIAL, validarMaestro, crearMaestro);
  const { nombre, email, password,tutor } = valores;

  const router = useRouter();
  const { usuario } = useContext(FirebaseContext);
  async function crearMaestro() {
    if (!usuario) {
      return router.push("/login");
    }
    const maestro = {
      nombre,
      email,
      horario,
      tipo: "maestro",
      tutor,
    };
    try {
      await firebase.registrar(nombre, email, password);
      await firebase.db.collection("usuarios").add(maestro);
    } catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <div
            css={css`
              display: flex;
            `}
          >
            <Cartita />
            <Cartita />
          </div>
          <h1>Crear Cuenta</h1>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="tutor">
              Tutor
              </label>
             <input type="checkbox" id="tutor" name="tutor" checked={tutor} onChange={handleChange} />
            
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
            <fieldset>
              <legend>Horario</legend>
              <label htmlFor="lunes">
                Lunes
                <input
                  type="checkbox"
                  id="lunes"
                  name="lunes"
                  checked={dias.lunes}
                  onChange={handleCheck}
                />
                {dias.lunes && (
                  <>
                    <input
                      type="time"
                      name="lunesEntrada"
                      value={horario.lunesEntrada}
                      onChange={onChin}
                    />
                    <input
                      type="time"
                      name="lunesSalida"
                      value={horario.lunesSalida}
                      onChange={onChin}
                    />
                  </>
                )}
              </label>
              <label htmlFor="martes">
                Martes
                <input
                  type="checkbox"
                  id="martes"
                  name="martes"
                  checked={dias.martes}
                  onChange={handleCheck}
                />
                {dias.martes && (
                  <>
                    <input
                      type="time"
                      name="martesEntrada"
                      value={horario.martesEntrada}
                      onChange={onChin}
                    />
                    <input
                      type="time"
                      name="martesSalida"
                      value={horario.martesSalida}
                      onChange={onChin}
                    />
                  </>
                )}
              </label>
              <label htmlFor="miercoles">
                Miercoles
                <input
                  type="checkbox"
                  id="miercoles"
                  name="miercoles"
                  checked={dias.miercoles}
                  onChange={handleCheck}
                />
                {dias.miercoles && (
                  <>
                    <input
                      type="time"
                      name="miercolesEntrada"
                      value={horario.miercolesEntrada}
                      onChange={onChin}
                    />
                    <input
                      type="time"
                      name="miercolesSalida"
                      value={horario.miercolesSalida}
                      onChange={onChin}
                    />
                  </>
                )}
              </label>
              <label htmlFor="jueves">
                Jueves
                <input
                  type="checkbox"
                  id="jueves"
                  name="jueves"
                  checked={dias.jueves}
                  onChange={handleCheck}
                />
                {dias.jueves && (
                  <>
                    <input
                      type="time"
                      name="juevesEntrada"
                      value={horario.juevesEntrada}
                      onChange={onChin}
                    />
                    <input
                      type="time"
                      name="juevesSalida"
                      value={horario.juevesSalida}
                      onChange={onChin}
                    />
                  </>
                )}
              </label>
              <label htmlFor="viernes">
                Viernes
                <input
                  type="checkbox"
                  id="viernes"
                  name="viernes"
                  checked={dias.viernes}
                  onChange={handleCheck}
                />
                {dias.viernes && (
                  <>
                    <input
                      type="time"
                      name="viernesEntrada"
                      value={horario.viernesEntrada}
                      onChange={onChin}
                    />
                    <input
                      type="time"
                      name="viernesSalida"
                      value={horario.viernesSalida}
                      onChange={onChin}
                    />
                  </>
                )}
              </label>
            </fieldset>

            <input type="submit" value="Crear cuenta" />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default Docentes;
