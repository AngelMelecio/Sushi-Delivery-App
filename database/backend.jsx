import { auth, DB, signInWithEmailAndPassword } from './firebase-config'



export async function LogIn(email, password) {
    await signInWithEmailAndPassword(auth, email.trim(), password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('user Loged In succesfully: ', user.email)
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage
            if (errorCode === 'auth/user-not-found') {
                errorMessage = 'Correo Electrónico no Encontrado!';
            }
            else if (errorCode === 'auth/invalid-email') {
                errorMessage = 'Correo Electrónico no Válido!';
            }
            else if (errorCode === 'auth/missing-email') {
                errorMessage = 'Ingresa un Correo Electrónico!';
            }
            else if (errorCode === 'auth/internal-error')
                errorMessage = 'Llene Todos los Campos!'
            else if (errorCode === 'auth/wrong-password')
                errorMessage = 'Contraseña Incorrecta!'
            console.log(errorCode)
            alert(errorMessage)
        })
}