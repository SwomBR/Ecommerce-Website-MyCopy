import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import CartPage from "./pages/CartPage"
import Checkout from "./pages/Checkout"
import Contact from './pages/Contact';
import DetailsPage from "./pages/DetailsPage";
import AboutPage from "./pages/AboutPage"
import Homepage from './pages/Homepage';
import SplashScreen from './pages/SplashScreen';
import Products from './pages/Products'
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import UpdateProducts from './pages/AdminPages/UpdateProducts';
import AddProduct from './pages/AdminPages/AddProduct';
import Category from './pages/AdminPages/Category'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='SignIn' element={<SignIn/>}/>
        <Route path='Splash' element={<SplashScreen/>}/>
        <Route path='Products' element={<Products/>}/>
        <Route path='About' element={<AboutPage/>}/>
        <Route path='details' element={<DetailsPage/>}/>
        <Route path='cart' element={<CartPage/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='add' element={<AddProduct/>}/>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='update' element={<UpdateProducts/>}/>
      </Routes>   
    </BrowserRouter>
  )
}

export default App
