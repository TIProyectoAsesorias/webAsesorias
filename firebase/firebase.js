import app from 'firebase/app';
import 'firebase/auth'
import firebaseConfig from './config';
 class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth=app.auth();
    }
    async registrar(nombre,email,password,matricula="NA",tipo="alumno"){
        const nuevoUsuario=await this.auth.createUserWithEmailAndPassword(email,password)
        return await nuevoUsuario.user.updateProfile({
            displayName:nombre,
            matricula: matricula,
            tipo:tipo
        })
    }
    async login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }
    async logOut(){
        await this.auth.signOut();
    }
}
const firebase=new Firebase();
export default firebase;