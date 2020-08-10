import Layout from '../../components/layout/layout'
import Router from "next/router";
/* import useValidar from "../hooks/useValidar"; */
import styled from "@emotion/styled";
import {FirebaseContext} from "../../firebase"; 
import React, { useState,useContext } from "react";
import { css } from "@emotion/core";
 import validarMaestro from "../../validar/validarMaestro"; 
 import Cartita from "../../components/ui/Cards"
//import { Formulario, Campo, InputSub, Error } from "../components/ui/Forms";
 const STATE_INICIAL = {
  nombre: "",
  password: "",
  email:"",
  horario:{
    lunes:false,
    martes:false,
    miercoles:false,
    jueves:false,
    viernes:false,
  }
}; 
const Docentes = () => {
 /*  const [error, setError] = useState(false);
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
  } */
 const [error,setError]=useState(false);
/*  const {
  valores,
  errores,

  handleSubmit,
  handleChange,
  handleBlur,
} = useValidacion(STATE_INICIAL, validarMaestro, crearMaestro);

const router=useRouter();
const {usuario,firebase}=useContext(FirebaseContext);
async function crearMaestro(){
  if(!usuario){
    return router.push("/login");
  }
  try {
    await firebase.registrar(nombre, email, password);
    
  } catch (error) {
    console.error("Error", error.message);
    setError(error.message);
  }
} */
  return (
    <div>
      <Layout>
        <>
       <div  css={css`display:flex`} ><Cartita/>
          <Cartita/></div>
          <h1>Crear Cuenta</h1>
          
          <form /* onSubmit={handleSubmit} */ noValidate>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="nombre"
             /*  value={nombre}
              onChange={handleChange}
              onBlur={handleBlur} */
            />
           
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
             /*  value={password}
              onChange={handleChange}
              onBlur={handleBlur} */
            />
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="email"
              placeholder="correo"
              name="email"
              /* value={email}
              onChange={handleChange}
              onBlur={handleBlur} */
            />
            <fieldset>
              <legend>Horario</legend>
              <label htmlFor="lunes">
                Lunes
                <input type="checkbox" id="lunes" name="lunes" /* checked={dias.lunes} *//>
                <input type="time" name="lunes"/>
                <input type="time" name="lunes"/>
              </label>
              <label htmlFor="martes">
                Martes
                <input type="checkbox" id="martes" name="martes" /* checked={dias.martes} *//>
                <input type="time" name="martes"/>
                <input type="time" name="martes"/>

              </label>
              <label htmlFor="miercoles">
                Miercoles
                <input type="checkbox" id="miercoles" name="miercoles" /* checked={dias.miercoles} *//>
                <input type="time" name="miercoles"/>
                <input type="time" name="miercoles"/>

              </label>
              <label htmlFor="jueves">
                Jueves
                <input type="checkbox" id="jueves" name="jueves" /* checked={dias.jueves} *//>
                <input type="time" name="jueves"/>
                <input type="time" name="jueves"/>

              </label>
              <label htmlFor="viernes">
                Viernes
                <input type="checkbox" id="viernes" name="viernes"/*  checked={dias.viernes} */ />
               {/*  {dias.viernes&&<> <input type="time" name="viernes"/>
                <input type="time" name="viernes"/></>} */}
               

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