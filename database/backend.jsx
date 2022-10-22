import { signOut } from 'firebase/auth';
import React from 'react'
import ProfilePage from '../src/pages/ProfilePage';
import {
    DB,
    auth,
    doc,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    collection,
    query,
    orderBy,
    limit,
    where,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
    Timestamp,
    arrayUnion,
    updateDoc,
    deleteDoc

} from './firebase-config'

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

            throw errorMessage
        })
}

export async function SignUp(userName, email, phone, address, password) {
    await createUserWithEmailAndPassword(auth, email.trim(), password)
        .then((userCredential) => {
            const user = userCredential.user

            const docRef = doc(DB,'userProfile', email)
            setDoc( docRef, {
                name: userName,
                email: email,
                phone: phone,
                address: address,
            } )

            const chatRef = doc(DB,'Chats', email)
            setDoc( chatRef, {messages:[]})
            
            const orderRef = doc(DB,'orders', email)
            setDoc( orderRef, { active:false })
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = ''
            if (errorCode === 'auth/email-already-in-use')
                errorMessage = 'El Correo Electrónico ya Está en Uso!'
            throw errorMessage
        })
}
export async function Logout(){
    await signOut(auth).then(() => {

    }).catch((error) => {
        alert(error.message)
    });
}

export async function getProfileDoc(email) {
    const userRef = doc(DB,'userProfile', email)
    const document = await getDoc(userRef)
    /*const q = query(collection(DB, 'userProfile'), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    const document = querySnapshot.docs[0]*/
    return document

}

export async function getProfile(email) {
    const document = await getProfileDoc(email)
    if (document) {
        return document.data() 
    }
    return null
}

export async function updateUser(name='', email='', phone='', address='') {
    await updateEmail(auth.currentUser, email)
        .then(async () => {
            const document = doc(DB,'userProfile',email)
            setDoc(document, {
                name: name,
                email: email,
                phone: phone,
                address: address
            })
        }).catch((error) => {
            if (error.message === 'Firebase: Error (auth/requires-recent-login).') {
                throw 'Tu sesión expiró, vuelve a autenticarte'
            }
            else {
                throw (error.message)
            }
        });
}

export function chatQuery(id) {
    const docRef = doc(DB, 'userProfile', id)
    const colRef = collection(docRef, 'OrderChat')
    return query(colRef, orderBy('createdAt'), limit(20))
}

export function ordersQuery(){
    return query(collection(DB, 'orders'), orderBy('date'))
}

export async function writeChat(sender, id, message) {
    const chatRef = doc(DB, 'Chats', id )
    await updateDoc(chatRef,{
        messages: arrayUnion({
            text: message,
            sender: sender,
            createdAt: Timestamp.now()
        })
    })
    if( sender === 'admin@gmail.com' )return 
    await setNotification(id,true)
}

export function chatsCollection(){
    return collection(DB, 'Chats')
}

export async function setNotification(id, boolean){
    const docRef = doc(DB, 'orders', id )
    await updateDoc(docRef,{
        notification:boolean
    })
}
export async function setActive(id, boolean){
    const docRef = doc(DB,'orders', id)
    await updateDoc(docRef,{
        active:boolean
    })
}
export async function getActive(id){
    const docRef = doc(DB,'orders',id)
    const document = await getDoc(docRef)
    //console.log('doc:', document)
    return document.data().active
}

export async function setStatus(id,status){
    const docRef = doc(DB,'orders', id)
    await updateDoc(docRef,{
        status:status
    })
} 

export async function createOrder(user,items,total){
    const docRef = doc(DB,'orders',user.email)
    await setDoc(docRef,{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        date:Timestamp.now(),
        products:items,
        total:total,
        notification:true,
        active:true,
        status:0,
    })
}
export async function createDefaultOrder(email){
    const docRef = doc(DB,'orders',email)
    await setDoc(docRef,{
        active:false
    })
}
export async function createDefaultChat(email){
    const docRef = doc(DB,'Chats',email)
    await setDoc(docRef,{
        messages:[]
    })
}

export async function deleteDocument(collectionName,email){
    const docRef = doc(DB,collectionName,email)
    await deleteDoc(docRef) 
}