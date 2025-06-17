import "./CartWidget.scss"
import { Link } from "react-router"
import { useAppContext } from "../../context/context"

function CartWidget(){

    const {cart} = useAppContext()

    return(
        <div className="nav-container">
        <ul className="nav">
            <li><button className=" button" href="">Catálogo</button></li>
            <li><Link to={"/"} className="button"> Inicio</Link></li>
            <li><Link to={"/myCart"} className=" button" href="">🛒Carrito: {cart.length}</Link></li>
        </ul>
    </div>
    )
}
export default CartWidget