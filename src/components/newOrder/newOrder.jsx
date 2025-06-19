import "./NewOrder.scss"
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import { db } from "../../fireBaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';

function NewOrder() {
  const { cart, user, showNotification } = useAppContext();
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  useEffect(() => {
    if (!user) {
      showNotification("Debes iniciar sesión para comprar");
      setTimeout(() => {
        navigate("/myAccount");
      }, 1800);
    }
    if (!cart || cart.length === 0) {
      showNotification("Debe tener uno o más productos en el carrito");
      setTimeout(() => {
        navigate("/products");
      }, 1800);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!direccion) {
      showNotification("Debe completar la dirección");
      return;
    }

    const nuevoPedido = {
      uid: user.uid,
      email: user.email,
      direccion,
      metodoPago,
      productos: cart,
      estado: "pendiente",
      fecha: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), nuevoPedido);
      setPedidoRealizado(true);
      showNotification("Pedido realizado con éxito", 1300);


        const productos = cart.map(item =>
        `${item.name} (${item.size}ml) x1 - $${item.price}`
        ).join('\n');

        const total = cart.reduce((acc, item) => acc + item.price, 0);

        emailjs.send("IlCircoloNero", "orderReady", {
        to_name: user.displayName || "Cliente",
        to_email: user.email,
        fecha: new Date().toLocaleString(),
        direccion: direccion,
        productos: productos,
        total: `$${total}`,
        logo1: 'https://i.imgur.com/xzN9C0R.png'
        }, "s04wjrSg3KkjxJJS4")
        .then(() => {
        console.log("Correo enviado con éxito");
        })
        .catch((error) => {
        console.error("Error al enviar correo:", error);
        });
    } catch (err) {
      console.error("Error al registrar pedido:", err);
      showNotification("Hubo un error al realizar tu pedido");
    }

  };
  return (
    <div className="main">
      {user && cart?.length > 0 ? (
        <div  className="order">
          {!pedidoRealizado ? (
            <>
              <p className="heading">Muchas gracias por la compra</p>
              <p>
                Odiamos las formalidades tanto como usted. Pero sin esto no podrá recibir su compra
              </p>
              <div className="form-container">  
              <form onSubmit={handleSubmit} className="form">
                  <input
                  className="input"
                  name="direction"
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    placeholder="Dirección de entrega"
                  />
                  <select
                  className="input"
                  name="payment"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta" disabled>
                      Tarjeta (próximamente)
                    </option>
                  </select>
                <button className="button" type="submit">Confirmar pedido</button>
              </form>
              </div>
            </>
          ) : (
            <div>
                <p className="heading">Un placer hacer negocios con usted, {user?.displayName || "usuario"}. Il Circolo Nero se encargará de ahora en más</p>
                <p className="text">En instantes le llegarán los detalles del envio a su correo</p>
            </div>
          )}
        </div>
      ) : (
        <></> // ya se redirige desde el useEffect
      )}
    </div>
  );
}

export default NewOrder;
