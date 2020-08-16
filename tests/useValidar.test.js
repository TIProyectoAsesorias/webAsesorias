import { renderHook, act } from "@testing-library/react-hooks";
import useValidar from "../hooks/useValidar";
describe("UseValidar", () => {
  const stateInicial = {
    email: "",
    matricula: "",
    nombre: "",
    password: "",
  };

  const validar = jest.fn();
  validar.mockReturnValue({});
  const fn = jest.fn();
  const event = {
    target: { name: "nombre", value: "nombre" },
    preventDefault: () => {
      return true;
    },
  };
  it("Funcionar", () => {
    const { result } = renderHook(() => useValidar(stateInicial, validar, fn));
    act(() => {
      result.current.handleChange(event);
      result.current.handleSubmit(event);
      result.current.handleBlur();
    });
    expect(result.current.valores).toStrictEqual({
      email: "",
      matricula: "",
      nombre: "nombre",
      password: "",
    });
    expect(result.current.errores).toStrictEqual({});
    expect(result.current.submitForm).toStrictEqual(false);
    expect(typeof result.current.handleSubmit).toBe("function");
    expect(typeof result.current.handleChange).toBe("function");
    expect(typeof result.current.handleBlur).toBe("function");
  });
});
