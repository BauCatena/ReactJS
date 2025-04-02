import "./notFound.scss"
import { Link } from "react-router"

function notFound(){
    return(
        <div className="error-container">
            <div className="brutalist-card">
            <div className="brutalist-card__header">
                <div className="brutalist-card__alert">Disculpe las molestias</div>
            </div>
            <div className="brutalist-card__message">
                <p>No pregunte por lo que no quiere saber, no nos gustan los curiosos. Considere esto como la primer
                y última advertencia. Entienda que esta situación es incómoda tanto para usted como para nosotros. 
                Que tenga un buen día.</p>
                <p>Atentamente: Il Circolo Nero</p>
            </div>
            <div className="brutalist-card__actions">
                <Link to={"/"}>
                    <button className="brutalist-card__button brutalist-card__button--read">Entiendo</button>
                </Link>
            </div>
            </div>
        </div>
    )
}
export default notFound