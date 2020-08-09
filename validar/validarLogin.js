export default function validarLogIn(valores) {
    let errores = {};

   
    if (!valores.email) {
      errores.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
      errores.email = "Email invalido";
    }
    if (!valores.password) {
      errores.password = "La contraseña es obligatoria";
    } else if (valores.password.length < 6) {
      errores.password = "el password debe ser de al menos 6 caracteres";
    }
    return errores;
  }