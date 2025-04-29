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
                    <img className="product-icon" src={img} alt="product" />
                    <p> {name} </p>
                    <p>Precio: $ {price}</p>
                        </Link>
                    <div data-tooltip={stock +" unidades"} className="button">
                        <div className="button-wrapper" onClick={()=>{addToCart(product, 1)}}>
                            <div className="text" >Agregar al carrito</div>
                            <span className="icon">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductCard