import "./CartWidget.scss"
import { Link } from "react-router"
import { useAppContext } from "../../context/context"

function CartWidget(){

    const {cart} = useAppContext()

    return(
        <div className="nav-container">
        <ul className="nav">
            <li><a className="nav-element" href="">Catálogo</a></li>
            <li><Link to={"/"}><p className="nav-element">Inicio</p></Link></li>
            <li><Link to={"/myCart"} className="nav-element" href="">🛒Carrito: {cart.length}</Link></li>
        </ul>
    </div>
    )
}
export default CartWidget