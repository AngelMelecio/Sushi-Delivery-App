import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, onAuthStateChanged } from '../../database/firebase-config'
import { getProfile, getActive } from '../../database/backend'
import {Fonts} from '../../constants/Fonts'

const CasaMakiContext = createContext({})

export function useCasaMaki() {
    return useContext(CasaMakiContext)
}
export function CasaMakiProvider({ children }) {
    
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [activeOrder, setActiveOrder] = useState(false)
    const [user, setUser] = useState(null)

    const textStyles = Fonts()

    function onAuthStateChange(callback) {
        return onAuthStateChanged(auth, async(user) => {
            console.log(' Auth Changed in Context :')
            if (user) {
                setUser(await getProfile(user.email))     
                setActiveOrder( await getActive(user.email) )
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
        return () => unsubscribe()
    }, [])

    function getCartItems() {
        return cartItems
    }
    function getCartSize() {
        return cartItems.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    }
    function getCartTotal(){
        return cartItems.reduce((total, item) => {
            return total + item.total
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
    function clearCart(){
        setCartItems([])
    }

    return (
        <CasaMakiContext.Provider
            value={{
                addCartitem,
                getCartItems,
                getCartSize,
                getCartTotal,
                removeCartItem,
                clearCart, 
                
                textStyles,

                isLoading,
                setIsLoading,
                isSignedUp,
                setIsSignedUp,
                user,
                setUser,
                activeOrder,
                setActiveOrder,
            }}
        >
            {children}
        </CasaMakiContext.Provider>
    )
}
