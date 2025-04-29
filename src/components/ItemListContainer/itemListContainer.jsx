import "./ItemListContainer.scss";
import ProductCard from "../productCard/productsCard";
import { useState, useEffect } from "react";
import Loader from "../loader/loader";
import CategoryFilter from "../categoryFilter/categoryFilter";
import { useParams } from "react-router";
import { useAppContext } from "../../context/context";

function ItemListContainer() {
    const { data: allProducts } = useAppContext();
    const loading = !allProducts;

    const [allCategories, setAllCategories] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        if (allProducts) {
            const categories = [...new Set(allProducts.map(product => product.category))];
            setAllCategories(categories);
        }
    }, [allProducts]);

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        );
    }

    const filteredProducts = category
        ? allProducts.filter(el => el.category === category)
        : allProducts;

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
