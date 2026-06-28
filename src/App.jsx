import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomeScreen from "./pages/HomeScreen"
import Search from "./pages/Search"
import BakeryProfile from "./pages/BakeryProfile"
import OrderForm from "./pages/OrderForm"
import Login from "./pages/Login"
import Admin from "./pages/Admin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bakery" element={<BakeryProfile />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App