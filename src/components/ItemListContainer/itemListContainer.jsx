import "./ItemListContainer.scss";
import ProductCard from "../productCard/productsCard";
import Loader from "../loader/loader";
import CategoryFilter from "../categoryFilter/categoryFilter";
import { useParams } from "react-router";
import { useAppContext } from "../../context/context";

function ItemListContainer() {
    const { category } = useParams();
    const {
        loading,
        getCategories,
        getProductsByCategory,
    } = useAppContext();

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        );
    }

    const filteredProducts = getProductsByCategory(category);
    const allCategories = getCategories();

    return (
        <div className="main-products">
            <CategoryFilter allCategories={allCategories} />
            <div className="product-container">
                {filteredProducts.map(el => (
                    <ProductCard key={el.id} product={el} />
                ))}
            </div>
        </div>
    );
}

export default ItemListContainer;
