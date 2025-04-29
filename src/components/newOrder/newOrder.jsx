import { useNavigate, } from "react-router"
import { useAppContext } from "../../context/context"
import { useEffect } from "react"
import { db } from "../../fireBaseConfig"
import { collection, addDoc } from "firebase/firestore"

 function NewOrder(){

    const { cart } = useAppContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(cart == 0){
            alert("Debe tener uno o más productos en el carrito")
            navigate("/")
        }
    },[])


    function newOrder(){
    let name = document.getElementById("customer").value
    let email =  document.getElementById("customer-email").value
    let number = document.getElementById("customer-number").value
    
    if(name == 0 || email == 0 || number == 0){
        alert("Por favor ingrese argumentos válidos")
    }
    else{
        console.log("jsbdhjbsdkjfhbadskf");  
        (async () => {
            try {
                console.log("creando orden");
                const orderReady = await addDoc(collection(db, "orders"), {
                    name: name,
                    email: email,
                    number: number,
                    date: new Date(),
                    products: cart
                });

                alert("Orden creada, código:", orderReady.id)
            } catch (error) {
                console.error("Error al crear order: ", error);
            }
        })();
        }

    }

        return(
            <div>
                <p className="heading"> Muchas gracias por la compra</p>
                <div>
                    <p>Por favor ingrese sus datos para finalizar</p>
                    <form action="">
                        <input type="text" name="customer" id="customer"/>
                        <label htmlFor="customer">Nombre: </label>
                        <input type="email" name="customer-email" id="customer-email"/>
                        <label htmlFor="customer-email">Email: </label>
                        <input type="number" name="customer-number" id="customer-number" />
                        <label htmlFor="customer-number">Teléfono: </label>
                        <button type="submit" onClick={(e)=>{ e.preventDefault(); newOrder()}} >Finalizar pedido</button>
                    </form>
                </div>
            </div>
        )
}
export default NewOrder