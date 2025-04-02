    import "./ItemListContainer.scss"
    import ProductCard from "../productCard/productsCard"
    import {useState, useEffect} from "react"
    import { fetchData } from "../../fetchData"
    import Loader from "../loader/loader"
    import CategoryFilter from "../categoryFilter/categoryFilter"
    import { useParams } from "react-router"

    function ItemListContainer(){

        const [loading, isLoading] = useState(true)
        const [allProducts, setAllProducts] = useState(null)
        const [allCategories, setAllCategories] = useState(null)

        const { category } = useParams()

        useEffect(() => {
            if(!allProducts){
                fetchData()
                .then(response => {
                setAllProducts(response)
                const categories = [...new Set(response.map(product => product.category))]
                    setAllCategories(categories)
                setTimeout(() => {
                    isLoading(false)
                }, 500)
                
                })
                .catch(err => console.error(err))
            }
            },)
    
        return(
            loading ?
            <div className="loader-container">
                <Loader/>
            </div>
            :
                <>
                    <div className="main-products">
                    <CategoryFilter allCategories={allCategories} />
                    <div className="product-container">
                    {
                        category ?

                        allProducts.filter(el => el.category === category).map(el => {
                            return(
                                <ProductCard key={el.id} product={el}/>
                            )
                        })
                        :
                        <>
                            {
                                allProducts.map(el => {
                                return(
                                    <ProductCard key={el.id} product={el}/>
                                )
                                })
                            }
                        </>
                    }</div>
                    </div>
                </> 
        )
    }

    export default ItemListContainer