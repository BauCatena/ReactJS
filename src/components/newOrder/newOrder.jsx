import "./newOrder.scss";
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/context";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import axios from "axios";

function NewOrder() {
  const { cart, user, showNotification, setCart } = useAppContext();
  const navigate = useNavigate();
  const apiKeyBrevo = import.meta.env.VITE_API_KEY;

  const [direccion, setDireccion] = useState("");
  const [altura, setAltura] = useState("");
  const [telefono, setTelefono] = useState("");
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
    if (!direccion || !altura || !telefono) {
      showNotification("Debe completar todos los campos");
      return;
    }

    const productosLimpios = cart.map(item => {
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
      user_id: user.id,      
      user_email: user.email,
      shipping_address: direccion,
      height: altura,
      phone_number: telefono,
      payment_method: metodoPago,
      status: "pendiente",
      created_at: new Date().toISOString(), 
      special_delivery: false
    };

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([nuevoPedido]);

      if (error) throw error;

      setPedidoRealizado(true);
      setTimeout(() => {
        setCart([]);
        navigate("/")
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

      const adminEmailPayload = {
        sender: { name: "Il Circolo Nero", email: "circoloneroprofumo@gmail.com" },
        to: [{ email: "bauticatena@gmail.com" }],
        subject: "Nuevo pedido recibido",
        htmlContent: `
          <h3>Nuevo pedido de ${user.user_metadata?.full_name || user.email}:</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Dirección:</strong> ${direccion} ${altura}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Método de pago:</strong> ${metodoPago}</p>
          <p><strong>Total:</strong> $${total}</p>
          <p><strong>Productos:</strong><br/>${productosCorreo.replace(/\n/g, '<br/>')}</p>
          <p>Fecha: ${new Date().toLocaleString()}</p>
        `
      };

      await axios.post("https://api.brevo.com/v3/smtp/email", adminEmailPayload, {
        headers: {
          "api-key": apiKeyBrevo,
          "Content-Type": "application/json"
        }
      });

      // Prepara los datos para el correo al usuario
      const userEmailPayload = {
        sender: { name: "Il Circolo Nero", email: "circoloneroprofumo@gmail.com" },
        to: [{ email: user.email }],
        subject: "Pedido Confirmado",
        templateID: 1,
        params: {
          nombre: user.user_metadata?.full_name || user.email,
          direccion: `${direccion} ${altura}`,
          telefono: telefono,
          metodoPago: metodoPago,
          total: total,
          productos: productosCorreo.replace(/\n/g, '<br/>'),
          fecha: new Date().toLocaleString()
        }
      };

      // https://my.brevo.com/template/.2niJnDoA3Umr2tvJ5D5w8DzZ2.59

      await axios.post("https://api.brevo.com/v3/smtp/email", userEmailPayload, {
        headers: {
          "api-key": apiKeyBrevo,
          "Content-Type": "application/json"
        }
      });

    } catch (error) {
      console.error(error);
      showNotification("Hubo un error al realizar tu pedido");
    }
  };

  return (
    <div className="main">
      {user && cart?.length > 0 ? (
        <div className="order">
          {!pedidoRealizado ? (
            <>
              <p className="heading">Muchas gracias por la compra</p>
              <p>Odiamos las formalidades tanto como usted. Pero sin esto no podrá recibir su compra</p>
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
                    <option value="tarjeta" disabled>Tarjeta (próximamente)</option>
                  </select>
                  <button className="button" type="submit">Confirmar pedido</button>
                </form>
              </div>
            </>
          ) : (
            <div>
              <p className="heading">Un placer hacer negocios con usted, {user.user_metadata?.full_name || user.email}.</p>
              <p className="text">En instantes le llegarán los detalles del envío a su correo</p>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NewOrder;
