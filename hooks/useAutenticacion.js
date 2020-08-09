import React, { useEffect, useState } from "react";
import firebase from "../firebase";
function useAutenticacion() {
  const [usuarioAut, setUsuarioAut] = useState(null);
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
          setUsuarioAut(usuario);
      }
      else{
          setUsuarioAut(null);

      }
    });
    return ()=>unsuscribe();
  }, []);
  return usuarioAut;
}
export default useAutenticacion;
