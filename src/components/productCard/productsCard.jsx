import "./productCard.scss"

import { useAppContext, ContextProvider } from "../../context/context"
import { useNavigate } from "react-router"

function ProductCard ({product}) {
    
    const { addToCart } = useAppContext()
    const { name, price_30ml, stock_30ml, image_url, id } = product;
    const navigate = useNavigate()



    return (
        <div className="card-container">
            <div className="card">
                <div className="card2">
                    <div onClick={
                        ()=>{setTimeout(() => {
                            navigate("detail/" + id)
                        }, 150);}
                    }>
                    <img className="product-icon el" src={image_url} alt="product" />
                    <p className="el"> {name} </p>
                    <p className="el">Precio: $ {price_30ml}</p>
                    <p className="el">Unidades disponibles: {stock_30ml}</p>
                    </div>
                    <div>
                    {stock_30ml ? <button className="button el" onClick={()=>{addToCart(product, 1)}}>Al carrito</button> :  <button className="button el">Sin stock</button>}
                    </div>
                </div>
            </div>
        </div>
    )
 //me las mande. arreglalo jajaja
}

export default ProductCard