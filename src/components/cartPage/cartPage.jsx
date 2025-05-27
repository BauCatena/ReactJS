import "./cartPage.scss";
import { useAppContext } from "../../context/context";
import { useState, useEffect } from "react";
import Loader from "../loader/loader.jsx";
import { Link } from "react-router";
import ProductCounter from "../productCounter/productCounter.jsx";

function CartPage() {
  const { cart, updateCartItemQuantity } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const total = () => cart.reduce((acc, el) => acc + el.amount * el.price, 0);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <p className="heading">Mi Carrito</p>

      {empty ? (
        <p className="heading">Tu carrito está vacío, agrega productos para poder comprarlos</p>
      ) : (
        <div className="cart-product-container flex-row">
          {cart.map(el => (
            <div key={el.id} className="product-card" product={el}>
              <div className="img-name">
                <div className="img">
                  {el.img}
                  una imagen re piola
                </div>
                <div className="info">
                  <p>{el.name}</p>
                  <p>{el.description}</p>
                  <div className="flex-column">
                    <br />
                    <p>Valor por unidad: $ {el.price}</p>
                    <p>Cantidad: {el.amount} unidad/es</p>
                    <p>Total: $ {el.price * el.amount}</p>
                    <p>Unidades disponibles: {el.stock}</p>
                  </div>
                </div>
              </div>

              <div className="flex-row center">
                <div className="flex-column">
                  <ProductCounter
                    stock={el.stock}
                    counter={el.amount}
                    onChange={(newCounter) => {
                      updateCartItemQuantity(el.id, newCounter);
                    }}
                  />
                  <button className="button" onClick={() => {
                    // Aquí pon tu función para eliminar
                  }}>Eliminar producto</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="final-step">
        <p>Total: $ {total()}</p>
        <Link to="/newOrder">
          <button>Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
