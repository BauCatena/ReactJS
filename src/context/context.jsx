import { createContext, useContext, useState } from "react"

import { useEffect } from "react"
import { fetchData } from "../fetchData"
import Notification from "../components/notification/notification"

const AppContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () =>  useContext(AppContext)

export const ContextProvider = (props) => {

    
    const [data, setData] = useState(null)
    const [cart, setCart] = useState([])
    const [notification, setNotification] = useState({ message: "", visible: false });

    
    useEffect(()=>{
        
        fetchData().then(response =>{ 
            setData(response)
        })
        
    },[])
    function showNotification(message) {
        setNotification({ message, visible: true });
        setTimeout(() => setNotification({ message: "", visible: false }), 2000);
    }

    function addToCart(product, amount) {
        const newProduct = { ...product, amount };
        if (cart.some(el => el.id === product.id)) {
            const newCart = cart.map(el =>
                el.id === product.id
                    ? { ...el, amount: el.amount + amount }
                    : el
            );
            setCart(newCart);
            showNotification("Producto agregado al carrito");
        } else {
            setCart([...cart, newProduct]);
            showNotification("Producto agregado al carrito");
        }
    }
    const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, amount: newQuantity } : item
        );
        return updatedCart;
    });
    };




   function removeFromCart(productId) {

        setCart(cart.filter(item => item.id !== productId))
    }

    return (
        <AppContext.Provider value={{
            cart, addToCart, data, removeFromCart, updateCartItemQuantity, notification
        }}>
            {props.children}
        </AppContext.Provider>
    )
}