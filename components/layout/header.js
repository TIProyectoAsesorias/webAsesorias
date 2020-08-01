import React ,{useState}from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import Navegacion from "./navegacion";
const Header = () => {
  const [user,setUser]=useState(true);
  return (
    <header>
      <div>
        <div>
          <Link href="/">
            <h1>AS</h1>
          </Link>
          {user ? (
            <>
              <p>Hola amibo</p>
              <Navegacion />
             <button onClick={()=>setUser(false)}>cerrar sesion</button>
            </>
          ) : (
            <>
              <Link href="/">
                <a>Login</a>
              </Link>
              <Link href="/">
                <a>Crear cuenta</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
