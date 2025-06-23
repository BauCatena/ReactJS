import "./productCard.scss"
import { Link } from "react-router"
import { useAppContext, ContextProvider } from "../../context/context"

function ProductCard ({product}) {
    
    const { addToCart } = useAppContext()

    const { id, name, sizes, imageUrl } = product
    const {30: small,} = sizes
    // const {price, stock} = small
    const numId = parseInt(id)



    return (
        <div className="card-container">
            <div className="card">
                <div className="card2">
                <Link to={"detail/"+ numId }>
                    <div>
                    <img className="product-icon el" src={imageUrl} alt="product" />
                    <p className="el"> {name} </p>
                    <p className="el">Precio: $ {small.price}</p>
                    <p className="el">Unidades disponibles: {small.stock}</p>
                    </div>
                </Link>
                    <div>
                    {small.stock ? <button className="button el" onClick={()=>{addToCart(product, 1)}}>Al carrito</button> : <button className="button el">Sin stock</button> }
                    </div>
                </div>
            </div>
        </div>
    )
 //me las mande. arreglalo jajaja
}

export default ProductCard