import "./cartPage.scss";
import { useAppContext } from "../../context/context";
import { useState, useEffect } from "react";
import Loader from "../loader/loader.jsx";
import { Link } from "react-router";
import ProductCounter from "../productCounter/productCounter.jsx";

function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart, addToCart } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);


  useEffect(() => {
    setEmpty(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    setLoading
  }, []);

  const total = cart.reduce((acc, el) => {
    const sizeKey = el.selectedSize;
    const price = sizeKey === "100ml" ? el.price_100ml : el.price_30ml;
    return acc + price * el.amount;
  }, 0);

  if (loading) {
    setLoading(false)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="main flex-column">
      <p className="heading">Tu Carrito</p>
      {empty ? (
        <p className="heading">Tu carrito está vacío, agrega productos para poder comprarlos</p>
      ) : (
        <div>
        <div className="cart-product-container flex-column">
          {cart.map(el => {

    const price = el.selectedSize === "30ml" ? el.price_30ml : el.price_100ml;
    const stock = el.selectedSize === "30ml" ? el.stock_30ml : el.stock_100ml;
  return (
    <div key={el.id + el.selectedSize} className="product-card">
      <div className="img-name">
        <div className="img">
          <img src={el.image_url} alt={el.name} />
        </div>
        <div className="info">
          <p>{el.name}</p>
          <p>{el.description}</p>
          <div className="flex-column">
            <br />
            <p>Valor por unidad: $ {price}</p>
            <p>Cantidad: {el.amount} unidad/es de {el.selectedSize}</p>
            <p>Total: $ {price * el.amount}</p>
            <br />
            <p>Unidades disponibles: {stock}</p>
          </div>
        </div>
      </div>
      <div className="flex-row center buttons">
        <div className="flex-column">
          <ProductCounter
            stock={stock}
            counter={el.amount}
            onChange={(newCounter) => {
              updateCartItemQuantity(el.id, newCounter);
            }}
          />
          <button className="button" onClick={() => {
            removeFromCart(el.id)
          }}>Eliminar producto</button>
        </div>
      </div>
    </div>
  );
})}
        </div>
        <div>
          <div className="final-step">
            <p className="price">Total: $ {total  }</p>
            <Link to="/newOrder">
              <button className="button" >Finalizar compra</button>
            </Link>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
