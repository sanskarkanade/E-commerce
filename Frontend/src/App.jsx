import "./App.css";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Help from "./components/Help";
import Mobile from "./components/Mobile";
import Search from "./components/Search";
import Sresult from "./components/Sresult";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import AddProduct from "./components/AddProduct";
import Cart from "./components/cart";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Orders from "./components/Orders";


function App() {

  const [searchQuery, setSearchQuery] = useState("");  // ✅ State for input text

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  

  return (
    <>
      <BrowserRouter>
        <Navber onsearchchange={handleSearchChange} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/mobile" element={<Mobile/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/search" element={<Search searchQuery={searchQuery}/>}/>
          <Route path="/result/:id" element={<Sresult/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/success" element={<Success />} />
         <Route path="/cancel" element={<Cancel />} />
         <Route path="/orders" element={<Orders />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
