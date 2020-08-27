import React from "react";
import Head from "next/head";
import Header from "./header";
import { Global, css } from "@emotion/core";
const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            /* Colors: */
            --blanco: #ffffff;
            --gris: #707070;
            --unnamed-color-272727: #272727;
            --verde: #006933;
            --unnamed-color-f1f1f1: #f1f1f1;
            --negrogris: #313131;
            --gristransparencia: #000000;
            --blancogris: #f6f6f6;
            --black: #000000B8;

            /* Font/text values */
            --unnamed-font-family-roboto: Roboto;
            --unnamed-font-family-segoe-ui: Segoe UI;
            --unnamed-font-style-regular: Regular;
            --unnamed-font-size-30: 18px;
            --unnamed-font-size-20:  19;
            --unnamed-font-size-44: 30px;
            --unnamed-font-size-90: 75px;
            --unnamed-character-spacing-0: 0px;
            --unnamed-line-spacing-37: 37px;
            --unnamed-line-spacing-40: 40px;
            --unnamed-line-spacing-53: 53px;
            --unnamed-line-spacing-109: 109px;
           --unnamed-font-size-35; 35px;
          }

          /* Character Styles */


          headerlettre {
            font-family: var(--unnamed-font-family-roboto);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-30);
            line-height: var(--unnamed-line-spacing-37);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--unnamed-color-f1f1f1);
          }
          lettre {
            font-family: var(--unnamed-font-family-roboto);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-30);
            line-height: var(--unnamed-line-spacing-37);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--unnamed-color-#000000B8);
          }
          lettres {
            font-family: var(--unnamed-font-family-roboto);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-35);
            line-height: var(--unnamed-line-spacing-37);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--unnamed-color-#000000B8);
          }

          h2 {
            font-family: var(--unnamed-font-family-roboto);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-44);
            line-height: var(--unnamed-line-spacing-53);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--gris);
          }

          h1 {
            font-family: var(--unnamed-font-family-roboto);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-90);
            line-height: var(--unnamed-line-spacing-109);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--unnamed-color-272727);
          }

          p {
            font-family: var(--unnamed-font-family-segoe-ui);
            font-style: var(--unnamed-font-style-regular);
            font-size: var(--unnamed-font-size-30);
            line-height: var(--unnamed-line-spacing-40);
            letter-spacing: var(--unnamed-character-spacing-0);
            color: var(--negrogris);
          }
  
         }
          @font-face {
            src: url("public/static/fonts/Segoe UI.ttf");
            font-family: segoe-ui;
          }

          body {
           margin: 0;
            text-align: center;
  
          }
        `}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <html lang="es" />
        <link rel="stylesheet" href="css" />
        <link
          href="http://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        />
        <title>Asesorias</title>
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
