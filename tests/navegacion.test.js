import React from 'react'
import Navegacion from '../components/layout/navegacion';
import Router from 'next/router'
import { render, screen } from "@testing-library/react";

describe("Barra de navegacion",()=>{
    

    it("Se renderea bien",()=>{
        render(<Navegacion/>);
        expect(
            screen.getByRole("Navegacion")
        ).toBeInTheDocument();
        expect(screen.getByText("Solicitudes")).toBeVisible();
        expect(screen.getByText("Gestión Educativa")).toBeVisible();
    });
   
});
