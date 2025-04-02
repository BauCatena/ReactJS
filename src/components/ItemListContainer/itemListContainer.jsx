import "./ItemListContainer.scss"
import ProductCard from "../productCard/productsCard"
 import {useState, useEffect} from "react"
import { fetchData } from "../../fetchData"
import Loader from "../loader/loader"

function ItemListContainer(){

    const [loading, isLoading] = useState(true)
    const [allProducts, setAllProducts] = useState(null)

    useEffect(() => {
        fetchData()
         .then(response => {
            setAllProducts(response)
          })
          .catch(err => console.error(err));
      })
    useEffect(() =>{
        setTimeout(() => {
            isLoading(false)
        }, 2500);
    })


    return(
        loading ?
        <div className="loader-container">
            <Loader/>
        </div>
        :
            <div className="product-container">
                {
                allProducts.map(el => {
                    return(
                        <ProductCard key={el.id} product={el}/>
                        )
                    })
                    }
            </div>  
    )
}

export default ItemListContainer