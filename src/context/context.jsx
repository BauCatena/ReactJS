import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/firebaseConfig";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState({ message: "", visible: false });
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchData().then(response => {
            setData(response);
            setLoading(false);
        });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // 🧠 Utilidades relacionadas con productos
    const getCategories = () => {
        if (!data) return [];
        return [...new Set(data.map(product => product.category))];
    };

    const getProductsByCategory = (category) => {
        if (!data) return [];
        return category
            ? data.filter(product => product.category === category)
            : data;
    };

    // 🔔 Notificaciones
    const showNotification = (message, timeout = 2000) => {
        setNotification({ message, visible: true });
        setTimeout(() => setNotification({ message: "", visible: false }), timeout);
    };

    // 🛒 Carrito
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
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, amount: newQuantity } : item
            )
        );
    };

    function removeFromCart(productId) {
        setCart(cart.filter(item => item.id !== productId));
        showNotification("Producto eliminado");
    }

    return (
        <AppContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                notification,
                showNotification,
                user,
                data,
                loading,
                getCategories,
                getProductsByCategory,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
