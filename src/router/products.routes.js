import {Router} from "express"
import fs, { read } from "fs"
import path from "path"
import __dirname from "../utils.js"

const productsRoutes = Router()
const productsList = path.join(__dirname, "./data/products.json")

const readProducts = () =>{
    //crear el archivo si no existe
    if (!fs.existsSync(productsList)) {
        fs.writeFileSync(productsList, JSON.stringify([]))
    }
    //devolver la info ya procesada
    const data = fs.readFileSync(productsList, "utf-8")
    return JSON.parse(data)
}

productsRoutes.get("/", (req, res) =>{
    try{   
        //llamar a la funcion y devolver parámetros
        const products = readProducts()
        res.json(products)
    }catch(error){ 
        res.status(500).send("Error al leer productos: "+ error)
    }
})
productsRoutes.get("/:pid",  (req, res)=>{
    try{
        //llamar a la funcion y filtrar
        const products = readProducts()
        const product = products.find((p) => p.id === parseInt(req.params.pid))
        if(!product){
            return res.status(404).send("Producto no encontrado")
        }
        res.json(product)
    }catch(error){
        res.status(500).send("Error al procesar la solicitud")
    }

productsRoutes.post("/", (req, res) =>{
    const newProduct = req.body
    const products = readProducts()
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    newProduct.id = newId
    
    products.push(newProduct)

    fs.writeFilesync(path.join(__dirname, "../products.json"), JSON.stringify(products, null, 2), "utf8", (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al guardar el producto" })
        }
  
        res.status(201).json({ message: "Producto agregado", product: newProduct })
      })
    })
})

export default productsRoutes