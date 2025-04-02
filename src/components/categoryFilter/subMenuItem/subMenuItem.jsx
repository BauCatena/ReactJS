import { Link } from "react-router"
import "./subMenuItem.scss"

function SubMenuItem({category}){
    return(
        <div className="submenu-item">
            <Link to={"/category/"+category}>
                <p href="#" className="submenu-link"> {category} </p>
            </Link>
        </div>
    )
}
export default SubMenuItem