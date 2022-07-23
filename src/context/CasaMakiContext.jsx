import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, getProfile, onAuthStateChanged } from '../../database/firebase-config'

const CasaMakiContext = createContext({})

export function useCasaMaki() {
    return useContext(CasaMakiContext)
}
export function CasaMakiProvider({ children }) {
    
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [user, setUser] = useState(null)

    function onAuthStateChange(callback) {
        return onAuthStateChanged(auth, async(user) => {
            console.log(' Auth Changed in Context :')
            if (user) {
                setUser(await getProfile(user.email))     
                callback(true)
                console.log(true)
            }
            else {
                callback(false)
                console.log(false)
            }
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setIsSignedUp);
        return ()=>unsubscribe()
        
    }, [])

    function getCartItems() {
        return cartItems
    }
    function getCartSize() {
        return cartItems.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    }
    function addCartitem(newItem) {
        setCartItems(currItems => {
            return [...currItems, newItem]
        })
    }
    function removeCartItem(index) {
        setCartItems(currItems => {
            return currItems.filter((item, currIndex) => {
                return currIndex !== index
            })
        })
    }

    return (
        <CasaMakiContext.Provider
            value={{
                getCartItems,
                addCartitem,
                removeCartItem,
                getCartSize,
                isLoading,
                setIsLoading,
                isSignedUp,
                setIsSignedUp,
                user,
            }}
        >
            {children}
        </CasaMakiContext.Provider>
    )
}
