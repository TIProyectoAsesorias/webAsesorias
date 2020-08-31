import Layout from "../../components/layout/layout";
import { useRouter } from "next/router";
import { css } from "@emotion/core";
import useValidar from "../../hooks/useValidar";
import styled from "@emotion/styled";
import firebase, { FirebaseContext } from "../../firebase";
import React, { useState, useContext } from "react";

import validarMaestro from "../../validar/validarMaestro";
import Link from "next/link";

//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";

const STATE_INICIAL = {
  nombre: "",
  email: "",
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
  const [tutor, setTutor] = useState(false);
  const onChin = (e) => {
    setHorario({ ...horario, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setDias({ ...dias, [e.target.name]: e.target.checked });
  };
  const handleTutor = (e) => {
    setTutor(e.target.checked);
  };

  const {
    valores,
    errores,

    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidar(STATE_INICIAL, validarMaestro, crearMaestro);
  const { nombre, email } = valores;
  const router = useRouter();
  const { usuario } = useContext(FirebaseContext);

  async function crearMaestro() {
    if (!usuario) {
      return router.push("/login");
    } else if (usuario.tipo !== "maestro") {
      return router.push("/login");
    }
    const maestro = {
      nombre,
      email,
      horario,
      tipo: "maestro",
      materias: [],
      tutor,
    };
    try {
      await firebase.db.collection("usuarios").add(maestro);
      /*  await firebase.registrar(nombre, email, password); */
    } catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  }

  const Espace = styled.div`
    padding-top: 7rem;
  `;

  const H2 = styled.h1`
    margin-top: -20px;
    margin-bottom: 5px;
  `;
  const H22 = styled.h2``;
  const Li = styled.li`
    list-style: none;
    margin-bottom: 5px;
  `;
  const Lit = styled.li`
    list-style: none;
    margin-bottom: 2px;
  `;
  const Ul = styled.ul`
    margin-top: -20px;
    margin-right: 30px;
  `;
  const Input = styled.input`
    width: 300px;
    margin-left: -4px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: center;
    border: solid 1px #707070;
  `;
  const Inpux = styled.input`
    width: 300px;
    text-align: center;
    display: center;
    height: 55px;
    margin-left: 5px;
    border-radius: 10px;
    margin-top: -30px;
    margin-bottom: 10px;
    box-shadow: 0px 5px 7px -4px #000000;
    webkit-box-shadow: 0px 5px 7px -4px #000000;
    background: #006933;

    font-family: var(--unnamed-font-family-roboto);
    font-style: var(--unnamed-font-style-regular);
    font-size: var(--unnamed-font-size-30);
    line-height: var(--unnamed-line-spacing-37);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
    &:hover {
      background: linear-gradient(180deg, #01602a 0%, #01602a 100%);
    }
    &:active {
      color: #006933;
    }
  `;
  const IMG = styled.img`
    margin-left: -1050px;
    margin-right: 150px;
    position: left;
    max-widht: 90%;
    &:hover {
      cursor: pointer;
    }
    &:active {
      color: #006933;
    }
  `;

  function Comprueba() {
    if (usuario) {
      if (usuario.tipo === "maestro" || usuario.tipo === "admin") {
        return null;
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login", undefined, { shallow: true });
    }
    return null;
  }

  return (
    <div onMouseEnter={Comprueba}>
      <Espace></Espace>
      <Layout>
        <>
          <div
            css={css`
              display: flex;
            `}
          ></div>
          <Link href="/gestioneducativa">
            <IMG width="40px" src="../static/img/ic_flecha.svg" />
          </Link>
          <H2>Crear Docente</H2>
          <form onSubmit={handleSubmit} noValidate>
            <Li>
              <label htmlFor="tutor">
                <lettre>Seleccione esta casilla si es tutor</lettre>
              </label>
              <input
                type="checkbox"
                id="tutor"
                name="tutor"
                checked={tutor}
                onChange={handleTutor}
              />
            </Li>

            <Li>
              <label htmlFor="nombre">
                <lettre>Nombre completo</lettre>
              </label>
            </Li>
            <Li>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="..."
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Li>

            <Li>
              <label htmlFor="correo">
                <lettre>Correo electrónico</lettre>
              </label>
            </Li>
            <Li>
              <Input
                type="email"
                id="email"
                placeholder="..."
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Li>

            <fieldset>
              <legend>
                <H22>Seleccione el horario</H22>
              </legend>
              <Ul>
                <Lit>
                  <label htmlFor="lunes">
                    <lettre>Lunes</lettre>
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
                </Lit>
                <Lit>
                  <label htmlFor="martes">
                    <lettre>Martes</lettre>
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
                </Lit>
                <Lit>
                  <label htmlFor="miercoles">
                    <lettre>Miércoles</lettre>
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
                </Lit>
                <Lit>
                  <label htmlFor="jueves">
                    <lettre>Jueves</lettre>
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
                </Lit>
                <Lit>
                  <label htmlFor="viernes">
                    <lettre>Viernes</lettre>
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
                </Lit>
              </Ul>
            </fieldset>
            <Inpux type="submit" value="Crear cuenta" />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default Docentes;
