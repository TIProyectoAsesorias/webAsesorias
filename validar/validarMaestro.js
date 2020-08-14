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
    if (!valores.password) {
      errores.password = "La contraseña es obligatoria";
    } else if (valores.password.length < 6) {
      errores.password = "el password debe ser de al menos 6 caracteres";
    }
 /*    let n=0;
    const cosa=valores.horario.map((dia)=> {if(dia[0]==="" || dia[1]===""){
      errores.horario.dia="Ambos tienen que estar llenos"
      n++;
    }
  })
    if(n===7){
      errores.horario="El horario tiene que tener disponible almenos un dia"
    } */

    return errores;
  }