import React from 'react'
import Navegacion from '../components/layout/navegacion';
import Router from 'next/router'
import { render, screen } from "@testing-library/react";

describe("Barra de navegacion",()=>{
    const bond={};
    beforeEach(() => {
        bond.routerChangeStart = jest.fn();
        Router.events.on('routeChangeStart', bond.routerChangeStart);
      });
    
      afterEach(() => {
        Router.events.off('routeChangeStart', bond.routerChangeStart);
      });

    it("Sale todo bien",()=>{
        render(<Navegacion/>);
        expect(
            screen.getByRole("Navegacion")
        ).toBeInTheDocument();
    });
    test("Solicitudes" ,async hecho=>{
        const jala=mount(<Navegacion/>);
        await jala.find(".belltest").at(0).simulate("click");
        expect(bond.routerChangeStart).toHaveBeenCalledWith("/solicitudes");
    })
});