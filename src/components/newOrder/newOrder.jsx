import "./NewOrder.scss"
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import { db } from "../../fireBaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';

function NewOrder() {
  const { cart, user, showNotification, setCart } = useAppContext();
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [altura, setAltura] = useState(""); // Nuevo estado para altura
  const [telefono, setTelefono] = useState(""); // Nuevo estado para teléfono
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
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!direccion || !altura || !telefono) {
      showNotification("Debe completar todos los campos");
      return;
    }

    const productosLimpios = cart.map(item => {
      // Asegúrate de que los campos importantes existan y no sean undefined
      const sizeKey = Object.keys(item.sizes)[0];
      const sizeObj = item.sizes[sizeKey] || {};
      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        size: sizeKey,
        price: sizeObj.price || 0,
        stock: sizeObj.stock || 0,
        img: item.img || "",
      };
    });

    const nuevoPedido = {
      uid: user.uid,
      email: user.email,
      direccion,
      altura,
      telefono,
      metodoPago,
      productos: productosLimpios,
      estado: "pendiente",
      fecha: serverTimestamp(),
    };
    console.log(nuevoPedido)
    try {
      await addDoc(collection(db, "orders"), nuevoPedido);
      setPedidoRealizado(true);
      setTimeout(() => {
        setCart([]);
      }, 5000);
      showNotification("Pedido realizado con éxito", 1300);

      
      // Genera el string de productos para el correo
      const productosCorreo = cart.map(item => {
        const sizeKey = Object.keys(item.sizes)[0];
        const sizeObj = item.sizes[sizeKey] || {};
        return `${item.name} (${sizeKey}ml) x${item.amount} - $${sizeObj.price * item.amount}`;
      }).join('\n');


      // Calcula el total real del carrito
      const total = cart.reduce((acc, item) => {
        const sizeKey = Object.keys(item.sizes)[0];
        const sizeObj = item.sizes[sizeKey] || {};
        return acc + (sizeObj.price || 0) * (item.amount || 1);
      }, 0);

      emailjs.send("IlCircoloNero", "orderReady", {
        to_name: user.displayName || "Cliente",
        to_email: user.email,
        fecha: new Date().toLocaleString(),
        direccion: direccion,
        productos: productosCorreo,
        total: `$${total}`,
        logo1: 'https://i.imgur.com/xzN9C0R.png'
        }, "s04wjrSg3KkjxJJS4")
          .catch((error) => {
            console.error("Error al enviar correo:", error);
            });

    } catch{
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
                    placeholder="Calle"
                  />
                  <input
                    className="input"
                    name="number"
                    type="number"
                    value={altura}
                    onChange={e => setAltura(e.target.value)}
                    required
                    placeholder="Altura"
                  />
                  <input
                    className="input"
                    name="telefono"
                    type="tel"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    required
                    placeholder="Teléfono"
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
