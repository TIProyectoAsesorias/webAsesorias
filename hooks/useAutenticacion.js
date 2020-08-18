import React, { useEffect, useState } from "react";
import firebase from "../firebase";
function useAutenticacion() {
  const [usuarioAut, setUsuarioAut] = useState(null);
  const [tipo, setTipo] = useState();
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        /*   setUsuarioAut(usuario); */
        firebase.db
          .collection("usuarios")
          .where("nombre", "==", usuario.displayName)
          .where("correo","==",usuario.email)
          .onSnapshot(manejarSnapshot);
        /*    setUsuarioAut(); */
      } else {
        setUsuarioAut(null);
      }
    });
    return () => unsuscribe();
  }, []);
  function manejarSnapshot(snapshot) {
    const usuario = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setUsuarioAut(usuario)
  }
  return usuarioAut;
}
export default useAutenticacion;
