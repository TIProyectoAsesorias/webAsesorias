import React from "react";
import Head from "next/head";
import Header from "./header"
const Layout = (props) => {
  return (
    <>
    <Head>
        <html lang="es"/>
        <title>Asesorias</title>
    </Head>
    <Header/>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
