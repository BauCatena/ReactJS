import express from "express"
import __dirname from "./utils.js"
//importar routers
import productsRoutes from "./router/products.routes.js"
import cartsRoutes from "./router/carts.routes.js"

const app = express()
//Iniciar server
app.listen(8080, () => {
    console.log("Servidor funcionando")
})
//Declarar middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productsRoutes)
app.use('/carts', cartsRoutes)