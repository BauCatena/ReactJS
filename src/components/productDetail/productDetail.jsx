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
    const [product, setProduct] = useState(0)
    const [sizes, setSizes] = useState(0)
    const [counter, setCounter] = useState(1)
    const [selectedSize, setSelectedSize] = useState("small")
    const {addToCart} = useAppContext()

    useEffect(() => {
        fetchData().then(response => {
            const productChosen = response.find(el => el.id === parseInt(id));
            setProduct(productChosen);
            if (productChosen && productChosen.sizes) {
                setSizes({
                    small: productChosen.sizes[30] || null,
                    big: productChosen.sizes[100] || null
                });
            }
            setLoading(false);
        });
    }, [id])
    
    const { name, description, dupe, img, longevity, projection, rating, similarity } = product;
    const currentSize = sizes[selectedSize] || {};
    
    
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
                        <img className="product-icon container" src={img} alt="product" />
                        <p> {name} </p>
                        <br />
                        <p> {description} </p>
                        <br />
                        <p> {"Dupe: "+ dupe} </p>
                        <br />
                        <p>Duración: {longevity}</p>
                        <p>Estela: {projection}</p>
                        <p>Similitud: {similarity} de 5</p>
                        <br />
                        <p>Puntuación: {rating} estrellas</p>
                        <p>Precio: $ { currentSize.price } </p>
                        <br />
                        <p>Quedan { currentSize.stock } unidades</p>
                    </div>
                    <div className="buttons-container">
                        <div className="flex-row">
                            <select
                              name="sizes"
                              className="input"
                              value={selectedSize}
                              onChange={e => {setSelectedSize(e.target.value)}}
                            >
                              <option value="small">30ml</option>
                              <option value="big">100ml</option>
                            </select>
                            <ProductCounter
                              stock={currentSize.stock}
                              counter={counter}
                              onChange={setCounter}
                            />
                        </div>
                        <div className="button-function-container">
                            {currentSize.stock > 0 ?  
                                <button onClick={() => { addToCart(product, counter, selectedSize) }} className="button" role="button">
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