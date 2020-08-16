import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";



const Zelda = styled.nav`
  list-style-type: none;
  margin: 20px;
  float: left;
  margin-left: 260px;
  margin-right: 5px;
  margin-top: -53px;
  display: inline;
  padding: 5px;
  
   li {
    display: inline-block;
    margin-left: 40px;
    font-family: var(--unnamed-font-family-roboto);
    font-style: var(--unnamed-font-style-regular);
    font-size: var(--unnamed-font-size-30);
    line-height: var(--unnamed-line-spacing-37);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-f1f1f1);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Navegacion = () => {

  //mwh
  return (
    <nav
      css={css`
        flex: 1 1 auto; 
        align-content: left;
        content: fixed;
      `}
      role="Navegacion"
    >
      <Zelda>
        <div className="bellTest">
        <Link href="/solicitudes">
        <li> Solicitudes </li>
        </Link>
        </div>
        <Link href="/gestioneducativa">
        <li> Gestión Educativa </li>
        </Link>

       
      </Zelda>
    </nav>
  );
};

export default Navegacion;

