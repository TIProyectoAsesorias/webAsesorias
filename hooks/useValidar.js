import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
const useValidar = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const [parche,setParche]=useState(false)
  useEffect(() => {
    if (submitForm) {
      const noError = Object.keys(errores).length === 0;
      if (noError) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errores]);
  //se ejecuta mientras el usuario escribe
  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    });
  };

  //funcion que se ejecuta cuNDO EL USUARIO HACE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValida = validar(valores);
    setErrores(erroresValida);
    setSubmitForm(true);
    setParche(true);
  };
  //cuando se revisa el evento del blur
  const handleBlur=()=>{
    const erroresValida = validar(valores);
    setErrores(erroresValida);
  }
  return {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,handleBlur,parche
  };
};
useValidar.propTypes = {
  stateInicial:PropTypes.object.isRequired,
  validar:PropTypes.func.isRequired,
  fn:PropTypes.func.isRequired
};
export default useValidar;
