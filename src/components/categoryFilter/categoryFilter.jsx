import "./categoryFilter.scss"
import SubMenuItem from "./subMenuItem/subMenuItem"

function CategoryFilter({allCategories}){


    return(
        <div className="menu">
            <div className="item">
                <a className="link">
                <span> Filtrar </span>
                </a>
                <div className="submenu">
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