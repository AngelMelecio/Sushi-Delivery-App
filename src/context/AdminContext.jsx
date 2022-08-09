import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, onAuthStateChanged } from '../../database/firebase-config'
import { getProfile, setActive, setStatus, deleteDocument,createDefaultOrder, createDefaultChat } from '../../database/backend'
import { onSnapshot } from '../../database/firebase-config'
import {ordersQuery, chatsCollection }from '../../database/backend'

const AdminContext = createContext({})

export function useAdmin() {
    return useContext(AdminContext)
}
export function AdminProvider({ children }) {

    const [orders, setOrders] = useState([])
    const [currentStatus, setCurrentStatus] = useState([])
    const [chats, setChats] = useState(null)
    
    function ordersOnSnap() {
        return onSnapshot(ordersQuery(), (querySnapshot) => {
            setOrders(querySnapshot.docs.map((doc) => doc.data().active && doc.data() ))
        })
    }

    function chatsOnSnap(callback){
        return onSnapshot( chatsCollection(), (querySnapshot) => {
            callback( querySnapshot.docs.map( (doc) => {
                let email = doc.id
                let messages = doc.data()
                return{ user:email, ...messages}
            } ) )
        })
    }

    useEffect(() => {
        const unsubscribe = ordersOnSnap();
        return () => unsubscribe()
    }, [])
    useEffect(() => {
        const unsubscribe = chatsOnSnap(setChats);
        return () => unsubscribe()
    }, [])

    useEffect(()=>{
        let status = orders.map((order)=>{
            return order.status
        })
        setCurrentStatus(status)
    },[orders])

    function getChat(id){
        return chats?.find( (chat)=> {
            return chat.user === id
        })  
    }

    function changeStatus(id,status){
        setStatus(id,status)
    }

    async function deleteOrder(id){
        await deleteDocument('orders',id)
        await createDefaultOrder(id)
        await deleteDocument('Chats', id)
        await createDefaultChat(id)
    }

    return (
        <AdminContext.Provider
            value={{
                orders,
                currentStatus,
                changeStatus,
                getChat,
                deleteOrder
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}
