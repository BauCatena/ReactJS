import { createContext, useContext, useState } from "react"
import { useEffect } from "react"
import { fetchData } from "../fetchData"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig";

const AppContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () =>  useContext(AppContext)

export const ContextProvider = (props) => {

    
    const [data, setData] = useState(null)
    const [cart, setCart] = useState([])
    const [notification, setNotification] = useState({ message: "", visible: false });
    const [user, setUser] = useState(null);

    
    useEffect(()=>{
        
        fetchData().then(response =>{ 
            setData(response)
        })
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
                
    },[])
    const showNotification = (message, timeout) => {
        if(!timeout) timeout = 2000;
        setNotification({ message, visible: true });
        setTimeout(() => setNotification({ message: "", visible: false }), timeout);
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
        showNotification("Producto eliminado")
    }

    return (
        <AppContext.Provider value={{
            cart, addToCart, data, removeFromCart, updateCartItemQuantity, notification, showNotification, user
        }}>
            {props.children}
        </AppContext.Provider>
    )
}