import React from 'react'
import firebase,{FirebaseContext} from "../firebase"
import Navegacion from '../components/layout/navegacion';
import Router from 'next/router'
import { render, screen } from "@testing-library/react";
jest.mock('../firebase');
describe("Barra de navegacion",()=>{
    

    it("Se renderea bien",()=>{
        render(<FirebaseContext.Provider value={
            {firebase,usuario:{
                
                nombre:"angel ",
                tipo:"admin"
            }}
        }><Navegacion/></FirebaseContext.Provider>);
        expect(
            screen.getByRole("Navegacion")
        ).toBeInTheDocument();
        expect(screen.getByText("Solicitudes")).toBeVisible();
        expect(screen.getByText("Gestión Educativa")).toBeVisible();
    });
   
});
