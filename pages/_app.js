import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";
import PropTypes from "prop-types";
import Login from "../pages/login";
const MyApp = (props) => {
  const usuario = useAutenticacion();
  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
export default MyApp;
/*usuario.propTypes = {
   Component:PropTypes.any,
   pageProps:PropTypes.object
  };
  {usuario?<Component {...pageProps}/>:<Login/>}*/
