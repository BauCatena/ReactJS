import "./CartWidget.scss"

function CartWidget(){
    return(
        <div className="nav-container">
        <ul className="nav">
            <li><a className="nav-element" href="">Catálogo</a></li>
            <li><a className="nav-element" href="">Inicio</a></li>
            <li><a className="nav-element" href="">🛒Carrito (0)</a></li>
        </ul>
    </div>
    )
}
export default CartWidget