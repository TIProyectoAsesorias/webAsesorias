import validarMaestro from "../validar/validarMaestro";
import validarCrearCuenta from "../validar/validarCrearCuenta";
import validarLogIn from "../validar/validarLogin";

describe("Validacion Maestro", () => {
  const datos = {
    email: "correo@correo.com",

    nombre: "nombre",
    matricula: "1111111111",
  };
  const errores = {
    email: "El email es obligatorio",
    nombre: "El nombre es obligatorio",
  };
  it("todos los datos son correctos", () => {
    expect(validarMaestro(datos)).toStrictEqual({});
  });
  it("no recibe nada", () => {
    expect(validarMaestro({})).toStrictEqual(errores);
  });
  it("Email incorrecta", () => {
    expect(
      validarMaestro({ ...datos, email: "correo" })
    ).toStrictEqual({
      email: "Email invalido",
     
    });
  });
});
describe("Validacion Login", () => {
  const datos = {
    email: "correo@correo.com",
    password: "password",
  };
  const errores = {
    email: "El email es obligatorio",
    password: "La contraseña es obligatoria",
  };
  it("todos los datos son correctos", () => {
    expect(validarLogIn(datos)).toStrictEqual({});
  });
  it("no recibe nada", () => {
    expect(validarLogIn({})).toStrictEqual(errores);
  });
  it("Email y contraseña incorrecta", () => {
    expect(validarLogIn({ email: "correo", password: "1234" })).toStrictEqual({
      email: "Email invalido",
      password: "el password debe ser de al menos 6 caracteres",
    });
  });
});

describe("Validacion crear alumno", () => {
  const datos = {
    email: "correo@correo.com",
    password: "password",
    nombre: "nombre",
    matricula: "1111111111",
  };
  const errores = {
    email: "El email es obligatorio",
    nombre: "El nombre es obligatorio",
    password: "La contraseña es obligatoria",
    matricula: "La matricula es obligatoria"
  };
  it("todos los datos son correctos", () => {
    expect(validarCrearCuenta(datos)).toStrictEqual({});
  });
  it("no recibe nada", () => {
    expect(validarCrearCuenta({})).toStrictEqual(errores);
  });
  it("Email, contraseña, matricula  incorrecta", () => {
    expect(
      validarCrearCuenta({ ...datos, email: "correo", password: "1234", matricula:"12345" })
    ).toStrictEqual({
      email: "Email invalido",
      password: "el password debe ser de al menos 6 caracteres",
      matricula:"La matricula son 10 caracteres"
    });
  });
});
