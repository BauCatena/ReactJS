import {Router} from "express"
import __dirname from "../utils.js"
const cartsRoutes = Router()

cartsRoutes.get("/", (req, res) =>{
    res.send("Lista de carritos")
})

cartsRoutes.post("/", (req,res) =>{
    res.send("Carrito actualizado")
})

export default cartsRoutes