import "./productCard.scss"
import { Link } from "react-router"
import { useAppContext, ContextProvider } from "../../context/context"

function ProductCard ({product}) {
    
    const { id, name, price, stock, img } = product
    const { addToCart } = useAppContext()
    const numId = parseInt(id)
    return (
        <div className="card-container">
            <div className="card">
                <div className="card2">
                <Link to={"detail/"+ numId }>
                    <img className="product-icon el" src={img} alt="product" />
                    <p className="el"> {name} </p>
                    <p className="el">Precio: $ {price}</p>
                    <p className="el">Unidades disponibles: {stock}</p>
                        </Link>
                    <button className="button el" onClick={()=>{addToCart(product, 1)}}>Al carrito</button>
                </div>
            </div>
        </div>
    )

}

export default ProductCard