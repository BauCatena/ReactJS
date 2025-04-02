import "./App.scss"
import NavBar from "./components/NavBar/NavBar"
import { BrowserRouter, Routes, Route } from "react-router"
import ItemListContainer from "./components/ItemListContainer/itemListContainer"
import ProductDetail from "./components/productDetail/productDetail"
import NotFound from "./components/notFound/notfound"

function App() {

  return (
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<ItemListContainer/>}/>
      <Route path="/category/:category" element={<ItemListContainer />} />
      <Route path="/category/:category/detail/:id" element={<ProductDetail/>} />
      <Route path="detail/:id" element={<ProductDetail/>} />
      <Route path="*" element={<NotFound/> } />
    </Routes>
  </BrowserRouter>

  )
}

export default App
