
import { createContext, useContext, useState } from "react";

import { useEffect } from "react";
import { fetchData } from "../fetchData";

const AppContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () =>  useContext(AppContext)

export const ContextProvider = (props) => {

    
    const [data, setData] = useState(null)
    const [cart, setCart] = useState([])

    useEffect(()=>{

        fetchData().then(response =>{ 
            setData(response)
        })

    },[])

    function addToCart(product, amount){
        const newProduct ={
            ...product,
            amount,
        }

        if(cart.some(el => el.id === product.id)){
            const newCart = cart.map(el => {
                if (el.id === product.id){
                    return{
                        ...el,
                        amount: el.amount + amount
                    }
                }
                else{
                    return el
                }
            })
            setCart(newCart)
            alert("Producto agregado al carrito")
        }else{
            setCart([...cart, newProduct])
            alert("Producto agregado al carrito")
        }
    }
    return(
        <AppContext.Provider value={{cart, addToCart, data}}>
            {props.children}
        </AppContext.Provider>
    )
}