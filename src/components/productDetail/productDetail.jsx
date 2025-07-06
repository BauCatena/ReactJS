import "./productDetail.scss"
import ProductCounter from "../productCounter/productCounter"
import { useState, useEffect } from "react"
import Loader from "../loader/loader"
import { Link, useParams } from "react-router"
import { fetchData } from "../../fetchData"
import NotFound from "../notFound/notFound"
import { useAppContext } from "../../context/context"

function ProductDetail() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(0)
    const [counter, setCounter] = useState(1)
    const [size, setSize] = useState("30ml")
    const {addToCart} = useAppContext()

    useEffect(() => {
        fetchData().then(response => {
            const productChosen = response.find(el => el.id === id);
            setProduct(productChosen);
            setLoading(false);
        });
    }, [id])

    const { name, image_url, description, dupe, longevity, projection, price_30ml, stock_30ml, stock_100ml, price_100ml } = product

    function sizeValues(size){
        let price = 0
        let stock = 0
        if(size == "30ml"){
            price = price_30ml
            stock = stock_30ml
        }else{
            price = price_100ml
            stock = stock_100ml
        }
        return {price, stock}
    }

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
                    <img className="product-icon" src={image_url} alt="product" />
                        <p> {name} </p>
                        <br />
                        <p> {description} </p>
                        <br />
                        <p> {"Dupe: "+ dupe} </p>
                        <br />
                        <p>Duración: {longevity}</p>
                        <p>Estela: {projection}</p>
                        <br />
                        <p>Precio: $ {sizeValues(size).price } </p>
                        <br />
                        <p>Quedan { sizeValues(size).stock } unidades</p>
                    </div>
                    <div className="buttons-container">
                        <div className="flex-row">
                            <select
                              name="sizes"
                              className="input"
                              
                              onChange={e => {setSize(e.target.value)}}
                            >
                              <option value="30ml">30ml</option>
                              <option value="100ml">100ml</option>
                            </select>
                            <ProductCounter
                              
                              counter={counter}
                              onChange={setCounter}
                            />
                        </div>
                        
                        <div className="button-function-container">
                            {  sizeValues(size).stock > 0 ?
                                <button onClick={() => { addToCart(product, counter, size) }} className="button" role="button">
                                    Agregar al carrito
                                </button>
                                :
                                <button className="button" disabled>Sin stock</button>
                            }
                            <Link to={"/products"}>
                                <button className="button" role="button">Volver al catálogo</button>
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

export default ProductDetail