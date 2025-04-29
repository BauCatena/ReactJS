import "./cartPage.scss"
import { useAppContext } from "../../context/context"
import ProductCard from "../productCard/productsCard"
import { useState, useEffect } from "react"
import Loader from "../loader/loader.jsx"
import { Link } from "react-router"

function CartPage(){

    const { cart } = useAppContext()
    const [loading, isLoading] = useState(true)
    const [ empty, setEmpty ] = useState(true)


    const total = () => {
        return cart.reduce((acc, el) => acc + el.amount * el.price, 0);
    }
    
    // useEffect para controlar si el carrito está vacío
    useEffect(() => {
        const totalValue = total();
        setEmpty(totalValue === 0);
    }, [cart]);
    
    // useEffect para simular carga
    useEffect(() => {
        const timer = setTimeout(() => {
            isLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
    }, []);


    return (
        loading ? (
            <div className="loader-container">
                <Loader />
            </div>
        ) : (
            <div>
                <p className="heading">Mi Carrito</p>
    
                {empty ? (
                    <p className="heading">Tu carrito está vacío, agrega productos para poder comprarlos</p>
                ) : (
                    <>
                        <div className="cart-product-container flex-row">
                            {cart.map(el => (
                                <div key={el.id}>
                                    <div className="product-card" product={el}>
                                        <div className="img-name">
                                            <div className="img">
                                                {el.img}
                                                una imagen re piola
                                            </div>
                                            <div className="info">
                                                <p>{el.name}</p>
                                                <p>{el.description}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Valor por unidad: $ {el.price}</p>
                                            <p>Cantidad: {el.amount} unidad/es</p>
                                            <p>Total: $ {el.price * el.amount}</p>
                                            <button>contador</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
    
                        <div className="final-step">
                            <div>
                                <p>Total: $ {total()}</p>
                                <Link to="/newOrder">
                                    <button>Finalizar compra</button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    );
    
}
export default CartPage