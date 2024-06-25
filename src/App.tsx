import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import AllCategories from './components/AllCategories/AllCategories';
import AllProducts from './components/AllProducts/AllProducts';
import AppLayout from './components/AppLayout/AppLayout';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";

function App() {
  console.log("app re-rendered");
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/categories' element={<AllCategories />}></Route>
          <Route path='/products' element={<AllProducts />}></Route>
          <Route path="/categories/:categoryName" element={
            <AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
     </Router> 
  )
}

export default App
