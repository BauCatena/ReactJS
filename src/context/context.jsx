import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { supabase } from "../lib/supabase";

const AppContext = createContext();

// Hook para usar el contexto
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ message: "", visible: false });
  const [user, setUser] = useState(null);

 useEffect(() => {
  fetchData().then(data => {
    setData(data);
    setLoading(false);
  });

    // Escuchar cambios de sesión Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // También obtenemos el usuario actual al montar
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
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

  // 🛒 Carrito (igual que antes, o puedes mejorar sincronizando con Supabase)

  function addToCart(product, amount, selectedSize) {
    if(!selectedSize) selectedSize = "30ml" ;
    const sizeKey = selectedSize;
    const price = sizeKey === "30ml" ? product.price_30ml : product.price_100ml;
    const stock = sizeKey === "30ml" ? product.stock_30ml : product.stock_100ml;

    const newProduct = {
      ...product,
      amount,
      selectedSize: sizeKey,
      price,
      stock,
    };

    const existingIndex = cart.findIndex(
      el => el.id === product.id && el.selectedSize === sizeKey
    );

    if (existingIndex !== -1) {
      const newCart = cart.map((el, idx) =>
        idx === existingIndex ? { ...el, amount: el.amount + amount } : el
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
        setCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
