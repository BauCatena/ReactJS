import "./NavBar.scss"
import CartWidget from "../CartWidget/CartWidget"
import { Link } from "react-router"

function NavBar(){

    return(
    <header className="header">
        <div className="header-container">
        <div className="flex-row center">
            <div className="account-container">
               <Link to="/myAccount">
                <button className="icon" href="./html/account.html"><img className="account-icon" src="/src/assets/incognito.svg" alt="cuenta"/></button>
               </Link>
                <div className="logo-container">
                    <p>Usuario</p>
                    <p>Rango</p>
                </div>
            </div>
        </div>
        <div className="logo-container">
            <img className="icon" src="/src/assets/logo0.png" alt="logo"/>
            <p className="heading">CIRCOLO NERO</p>
        </div>
        <div> 
            <input type="text" placeholder="Buscar" name="text" className="input"/>
        </div>
        </div>
        <CartWidget/>
    </header>
    )
}

export default NavBar