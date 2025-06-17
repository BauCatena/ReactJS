import "./categoryFilter.scss"
import "./subMenuItem/subMenuItem.scss"
import SubMenuItem from "./subMenuItem/subMenuItem"
import { Link } from "react-router"

function CategoryFilter({allCategories}){


    return(
        <div className="menu">
            <div className="item">
                <a className="link">
                <span> Filtrar </span>
                </a>
                <div className="submenu">
                <div className="submenu-item">
                    <Link to={"/"} >
                        <p className="submenu-link">Todos los productos</p>
                    </Link>
                </div>
                {
                    allCategories.map(el =>{
                        return(
                            <SubMenuItem key={el} category={el}/>
                        )
                    })
                }
                </div>
            </div>
        </div>

    )
}
export default CategoryFilter