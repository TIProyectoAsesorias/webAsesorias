import Header from '../components/layout/header'
import { render, screen } from "@testing-library/react";
import firebase,{FirebaseContext} from '../firebase'
jest.mock('../firebase');
const renderProvider=(usuario)=>{
    return render (<FirebaseContext.Provider value={
        usuario,firebase
    }><Header/></FirebaseContext.Provider>)
}
describe("Header",()=>{
    it("Usuario Existe",()=>{
        const usuario={nombre:"angel",otro:null}
        renderProvider(usuario);
        expect(
            screen.getByRole("existir")
        ).toBeInTheDocument()
    })
    it("Usuario no existe",()=>{
        renderProvider(null);
        expect(screen.getByText("Iniciar sesión")).toBeVisible();;
    })
})
