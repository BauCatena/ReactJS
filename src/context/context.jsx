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
    function addToCart(product, amount, sizeKey) {
        // Mapea sizeKey a la clave numérica real
        const sizeNumber = sizeKey === "big" ? 100 : 30;
        // Crea un objeto sizes solo con el tamaño seleccionado
        const selectedSizeObj = { [sizeNumber]: product.sizes[sizeNumber] };
        // Crea una copia del producto con el tamaño seleccionado
        const newProduct = { ...product, amount, sizeKey, sizes: selectedSizeObj };

        // Busca si ya existe el producto con el mismo id y tamaño en el carrito
        const existingIndex = cart.findIndex(
            el => el.id === product.id && el.sizeKey === sizeKey
        );

        if (existingIndex !== -1) {
            // Si ya existe, suma la cantidad
            const newCart = cart.map((el, idx) =>
                idx === existingIndex
                    ? { ...el, amount: el.amount + amount }
                    : el
            );
            setCart(newCart);
            showNotification("Producto agregado al carrito");
        } else {
            // Si no existe, agrega el nuevo producto con el tamaño seleccionado
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
                setCart,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
