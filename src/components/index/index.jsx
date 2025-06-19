import "./index.scss"
import {useAppContext} from "/src/context/context";
import ProductCard from "../productCard/productsCard";
import Footer from "../footer/footer";
import Loader from "../loader/loader"
import { Link } from "react-router";

function Index() {
    const {user, data, loading} = useAppContext()

    if (loading || !data) {
        return <div className="loader-container"><Loader/></div>;
    }
    const topProductIds = [1, 3, 2];
    const topProducts = data.filter(product => topProductIds.includes(product.id));
    


    return(
        <>
            <section className="main-container">
                <div className="intro">
                    <p className="heading">Benvenuti {user?.displayName || "forastero"}</p>
                    <p className="text">Perfumes inspirados en marcas de lujo, a precios del mercato nero. El secreto del buen gusto… ahora al alcance de todos.</p>
                </div>
                <div className="adverticement">
                    <p className="adverticement-title">Los buenos perfumes… se consiguen con buenos contactos, acá no hay etiquetas. Solo fraganze.</p>
                    <div className="flex-row center">
                        <div className="adverticement-image">
                            <p>Proximamente una imagen Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem excepturi dolore quo, ab praesentium aperiam in dolorum, nam ratione ipsa maxime, cumque rerum sint? Sunt qui assumenda in fugit atque.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae sit iste ab quaerat, porro eaque nemo numquam? Rerum, velit. Ipsa dolor magnam optio atque quae repellat fugiat, sit asperiores veritatis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem doloremque quam quibusdam distinctio ratione incidunt ea quo aliquam voluptates nostrum tempora similique fugit cumque saepe fugiat, corporis illo sed eligendi?</p>
                        </div>
                        <div className="adverticement-div">
                        <p className="adverticement-text">Descubrí en Il Circolo Nero una variedad de fragranze importadas inspiradas en las case más prestigiose. Explora con calma, encontrá ese aroma unico que te acompañe y disfrutá del lusso al alcance de tu mano, sin complicazioni ni formalità.</p>
                        <button className="button">Ver catálogo</button>
                        </div>
                    </div>
                </div>
                <div className="trending">
                    <p className="heading">Favoritos del público… y del capo, claro.</p>
                    <div className="top-products">
                        {topProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
                <div className="services-container">
                    <p className="heading">Contamos con todo tipo de servicios</p>
                    <div className="services">
                        <div className="service">
                            <img className="service-img" src="/src/assets/delivery.svg" alt="envío" />
                            <p>Envíos por correo</p>
                        </div>
                        <div className="service">
                            <img className="service-img" src="/src/assets/pagar-dolar.svg" alt="medios de pago" />
                            <p>Depósito o transferencia</p>
                        </div>
                        <div className="service">
                            <img className="service-img" src="/src/assets/apoyo.svg" alt="soporte" />
                            <p>Asistencia de compra/precompra</p>
                        </div>
                    </div>
                </div>
                {user ?
                <div className="buy-now">
                 <p className="heading">Querido {user?.displayName}.</p> 
                 <p className="buy-now-content">Cada compra que haces deja su marca en Il Circolo Nero.
                Sumá puntos, desbloqueá descuentos y accedé a beneficios que no se anuncian... solo se ofrecen.</p>
                <Link to={"/products"}>
                <button className="button">Iniciar compra</button>
                </Link>
                 </div> :
                
                <div className="buy-now">
                    <p className="heading">Ya sabés quiénes somos... ahora queremos saber quién sos vos.</p>
                    <p className="buy-now-content">Te invitamos a formar parte de Il Circolo Nero.
                        Es gratuito. Es secreto. Y solo los miembros del Circolo acceden a nuestras mejores fragancias del mercato nero.</p>
                    <Link to={"/myAccount"}>
                        <button className="button"> Registrarse</button>
                    </Link>
                </div>} 
            </section>      
        </>
    )
}
export default Index