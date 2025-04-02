import "./NavBar.scss"
import CartWidget from "../CartWidget/CartWidget"


function NavBar(){

    return(
    <header className="header">
        <div className="header-container">
        <div className="flex-row center">
        <label class="burger" for="burger">
            <input type="checkbox" id="burger" />
            <span></span>
            <span></span>
            <span></span>
        </label>
            <div className="account-container">
                <a className="icon" href="./html/account.html"><img src="" alt="cuenta"/></a>
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