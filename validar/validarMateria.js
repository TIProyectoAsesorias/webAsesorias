export default function validarMateria(valores){
    let errores={};
    if(!valores.nombre){
        errores.nombre="nombre es obligatorio";
    }
    if(!valores.tipo){
        errores.tipo="tipo de materia es obligatorio";
    }
    return errores;

}