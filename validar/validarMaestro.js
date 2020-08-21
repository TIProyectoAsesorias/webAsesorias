export default function validarMaestro(valores) {
    let errores = {};
    //validar nombre usuario
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }
    if (!valores.email) {
      errores.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
      errores.email = "Email invalido";
    }

    return errores;
  }