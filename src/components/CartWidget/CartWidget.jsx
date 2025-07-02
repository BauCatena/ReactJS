import "./CartWidget.scss"
import { Link } from "react-router"
import { useAppContext } from "../../context/context"

function CartWidget(){
    const {cart} = useAppContext()

    return(
        <div className="nav-container">
            <ul className="nav">
                <li><Link to={"/products"}><button className="button">Catálogo</button></Link></li>
                <li><Link to={"/"}><button className="button">Inicio</button></Link></li>
                <li>
                  <Link to={"/myCart"}>
                    <button className="button desktop">🛒Carrito: {cart.length}</button>
                    <button className="button mobile">🛒 {cart.length}</button>
                  </Link>
                </li>
            </ul>
        </div>
    )
}
export default CartWidget