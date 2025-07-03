import "./NavBar.scss"
import CartWidget from "../CartWidget/CartWidget"
import {useAppContext} from "/src/context/context"
import { useNavigate } from "react-router"

function NavBar(){

    const { user } = useAppContext();
    const navigate = useNavigate();

    return(
    <header className="header">
        <div className="header-container">
                <div className="account-container">
                    <button className="icon account" onClick={()=>navigate("/myAccount")}><img className="account-icon" src="/assets/incognito.svg" alt="cuenta"/></button>
                    <div className="account-info">
                        <p className="user">{user?.user_metadata.username || "Usuario"}</p>
                        <p className="rank">Rango:</p>
                    </div>
                </div>
            <div className="logo-container">
                <img className="icon" src="https://i.imgur.com/QZDQY31.png" alt="logo"/>
                <p className="nickname">CIRCOLO NERO</p>
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