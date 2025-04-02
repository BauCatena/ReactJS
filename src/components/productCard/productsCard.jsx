import "./productCard.scss"
import { Link } from "react-router"

function ProductCard ({product}) {
    
    const {id, name, price, stock, img} = product

    function addToCart(prod){
        const newProduct = {
            ...prod,
            cantidad: 1,
        }
        console.log("Adding: "+ newProduct)
    }
    return (
        <div className="card-container">
            <div className="card">
            <Link to={"detail/"+id}>
                <div className="card2">
                    <img className="product-icon" src={img} alt="product" />
                    <p> {name} </p>
                    <p>Precio: $ { price}</p>
                    <div data-tooltip={stock +" unidades"} className="button">
                        <div className="button-wrapper">
                            <div onClick={()=> addToCart(product)} className="text">Add to cart</div>
                            <span className="icon">
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            </div>
        </div>
    )

}

export default ProductCard