
import { useState } from "react"
import "./myAccount.scss"
function MyAccount(){

    const [register, setRegister] = useState(false);
    const [logIn, setLogIn] = useState(false);

//hola yo del futuro. Te toca la lógica de registrar/iniciar sesión como usuario. Suerte

    if(register){
        return(
            <div className="container">
                 <p>Ingrese los datos. Disculpe la formalidad</p>
                <input type="name" name="name" className="input" placeholder="Nombre"/>
                <input type="email" name="email" className="input" placeholder="Correo electrónico" autoComplete="off"/>
                <input type="password" name="password" className="input" placeholder="Contraseña" autoComplete="off"/>
                <div className="flex-row">
                    <input type="checkbox" />
                    <p>Estoy de acuerdo con los términos</p>
                </div>
                <button className="button">Registrarse</button>
             </div>
        )
    }else if(logIn){
        return(
            <div className="container">
                <input type="email" name="email" className="input" placeholder="Correo electrónico" autoComplete="off"/>
                <input type="password" name="password" className="input" placeholder="Contraseña" autoComplete="off"/>
                 <button className="button">Ese soy yo</button>
            </div>
        )
    }

    return(
        <div className="container">
            <p>Tu cara no me suena, registrate o inicia sesión</p>
            <div>
                <div className="cards">
                    <button className="card red" onClick={()=> setRegister(true)}>
                        <p className="tip">Registrarse</p>
                    </button>
                    <button className="card blue" onClick={()=> setLogIn(true)}>
                        <p className="tip">Iniciar sesión</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MyAccount