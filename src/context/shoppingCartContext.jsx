import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, onAuthStateChanged } from '../../database/firebase-config'
import { getProfile } from '../../database/backend'

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }) {
    
    const [cartItems, setCartItems] = useState([])
    
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
        <ShoppingCartContext.Provider
            value={{
                getCartItems,
                addCartitem,
                removeCartItem,
                getCartSize,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}
