import "./App.scss"
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemListContainer/itemListContainer"

function App() {

  return (
  <>
    <NavBar/>
    <ItemListContainer props="Bienvenidos a mi emprendimiento"/>
  </>
  )
}

export default App
