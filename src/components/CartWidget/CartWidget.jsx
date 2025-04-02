import "./CartWidget.scss"
import { Link } from "react-router"

function CartWidget(){
    return(
        <div className="nav-container">
        <ul className="nav">
            <li><a className="nav-element" href="">Catálogo</a></li>
            <li><Link to={"/"}><p className="nav-element">Inicio</p></Link></li>
            <li><a className="nav-element" href="">🛒Carrito (0)</a></li>
        </ul>
    </div>
    )
}
export default CartWidget