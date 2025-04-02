import "./App.scss"
import NavBar from "./components/NavBar/NavBar"
import { BrowserRouter, Routes, Route } from "react-router"
import ItemListContainer from "./components/ItemListContainer/itemListContainer"
import ProductDetail from "./components/productDetail/productDetail"

function App() {

  return (
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path="/" element={<ItemListContainer/>}/>
    <Route path="detail/:id" element={<ProductDetail/>} />
  </Routes>
  </BrowserRouter>

  )
}

export default App
