import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    toggleCart: () => void
    cartState: boolean
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart () {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[])

    const getItemQuantity = (id: number) => {
        return cartItems.find(elem => elem.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        //const accQuantity = cartItems.find(elem => elem.id === id)?.quantity || 0
        //setCartItems([...cartItems, cartItems[index].quantity>1?cartItems[index]={id:id, quantity:cartItems[index].quantity++}:{id:id, quantity:1}])        
        //const index = cartItems.findIndex(elem => elem.id === id)
        setCartItems(currItem => {
            if(currItem.find(item => item.id === id) == null) {
                return [...currItem, {id, quantity:1}]
            } else {
                return currItem.map(item => {
                    if(item.id === id){
                        return {...item,quantity:item.quantity++}
                    } else {
                        return item 
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        //const accQuantity = cartItems.find(elem => elem.id === id)?.quantity
        //const index = cartItems.findIndex(elem => elem.id === id)
        //setCartItems([...cartItems, accQuantity!==1?{id:id, quantity:cartItems[index].quantity--}:{id:id, quantity:0}].filter(elem => elem.quantity!==0))
        setCartItems(currItem => {
            if(currItem.find(item => item.id === id)?.quantity === 1) {
                return currItem.filter(item => item.id !== id)
            } else {
                return currItem.map(item => {
                    if(item.id === id){
                        return {...item,quantity:item.quantity--}
                    } else {
                        return item 
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => { 
        setCartItems([...cartItems].filter(elem => elem.id !== id))
    }

    const [cartState, setToggleCart] = useState(false)

    const toggleCart = () => {
        setToggleCart(!cartState)
    }

    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity, 0)

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart ,cartItems, toggleCart, cartState, cartQuantity}}>
            {children}
        </ShoppingCartContext.Provider>
}