import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
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

    const [cartItems, setCartItems] = useState <CartItem[]>([])

    const getItemQuantity = (id: number) => {
        return cartItems.find(elem => elem.id === id)?.quantity || 0
        console.log(cartItems);

    }

    const increaseCartQuantity = (id: number) => {
        const accQuantity = cartItems.find(elem => elem.id === id)?.quantity || 0
        const index = cartItems.findIndex(elem => elem.id === id)
        setCartItems([...cartItems, accQuantity?{id:id, quantity:cartItems[index].quantity++}:{id:id, quantity:1}])
        console.log(cartItems);
        
    }

    const decreaseCartQuantity = (id: number) => {
        const accQuantity = cartItems.find(elem => elem.id === id)?.quantity
        const index = cartItems.findIndex(elem => elem.id === id)
        setCartItems([...cartItems, accQuantity!==1?{id:id, quantity:cartItems[index].quantity--}:{id:id, quantity:0}].filter(elem => elem.quantity!==0))
        console.log(cartItems);

    }

    const removeFromCart = (id: number) => {
        setCartItems([...cartItems].filter(elem => elem.id !== id))
        console.log(cartItems);

    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
            {children}
        </ShoppingCartContext.Provider>
}