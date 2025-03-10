import "./NavBar.scss"
import CartWidget from "../CartWidget/CartWidget"

function NavBar(){

    return(
    <header className="header">
        <div className="header-container">
        <div className="flex-row">
            <label className="bar" for="check">
                <input className="menu" type="checkbox" id="check"/>
                <div id="modalMenu" className="modal-menu">
                    <div className="menu-content">
                        <a>Inicio</a>
                        <a href="./html/account.html">Mi Cuenta</a>
                        <a href="">Catálogo</a>
                    </div>
                </div>
                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
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
            <img className="icon" src="src/assets/logo0.png" alt="logo"/>
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