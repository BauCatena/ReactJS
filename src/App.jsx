import "./App.scss"
import { ContextProvider} from "./context/context"
import { BrowserRouter, Routes, Route } from "react-router"
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/itemListContainer"
import ProductDetail from "./components/productDetail/productDetail"
import NotFound from "./components/notFound/notfound"
import CartPage from "./components/cartPage/cartPage"
import NewOrder from "./components/newOrder/newOrder"
import Notification from "./components/notification/notification"
import { useAppContext } from "./context/context"
import MyAccount from "./components/myAccount/myAccount"
import Index from "./components/index"

function AppContent() {
  const { notification } = useAppContext();
  return (
    <>
      <NavBar/>
      <Notification message={notification.message} visible={notification.visible} />
      <Routes>
        <Route path="/products" element={<ItemListContainer/>}/>
        <Route path="/category/:category" element={<ItemListContainer />} />
        <Route path="/category/:category/detail/:id" element={<ProductDetail/>} />
        <Route path="detail/:id" element={<ProductDetail/>} />
        <Route path="/myCart" element={<CartPage/>} />
        <Route path="/myCart/detail/:id" element={<ProductDetail/>} />
        <Route path="*" element={<NotFound/> } />
        <Route path="/newOrder" element={<NewOrder/>} />
        <Route path="/myAccount" element={<MyAccount/>}/>
        <Route path="/" element={<Index/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <ContextProvider>    
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
