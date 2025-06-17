import "./productDetail.scss"
import ProductCounter from "../productCounter/productCounter"
import { useState, useEffect } from "react"
import Loader from "../loader/loader"
import { Link, useParams } from "react-router"
import { fetchData } from "../../fetchData"
import NotFound from "../notFound/notfound"
import { useAppContext } from "../../context/context"

function ProductDetail() {

    const { id } = useParams()

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null)
    const [counter, setCounter] = useState(1)
    const {addToCart} = useAppContext()

    useEffect(()=>{
        fetchData().then(response => {
            const productChosen = response.find(el => el.id === parseInt(id))
            setProduct(productChosen)
            setLoading(false)
            })
    },[])
    
    return (
        loading ?
        <div className="loader-container">
            <Loader/>
        </div>
        :
        <div className="card-detail-container">
        {
            product ?
            <div className="card-detail">
                <div className="card-detail2">
                    <div className="props-container">
                        <img className="product-icon container" src={product.img} alt="product" />
                        <p> {product.name} </p>
                        <p> {product.description} </p>
                        <p> {product.type} </p>
                        <p>Precio: $ { product.price} </p>
                        <p>Quedan {product.stock} unidades</p>
                    </div>
                    <div className="buttons-container">
                        <ProductCounter stock={product.stock} counter={counter} onChange={setCounter}></ProductCounter>
                        <div className="button-function-container">
                            <button onClick={()=>{addToCart(product, counter)}} className="button" role="button">Agregar al carrito</button>
                            <Link to={"/"}>
                            <button className="button" role="button">Volver al inicio</button> 
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
         :
         <NotFound/>
        }
        </div> 
    )
}

export default (ProductDetail)