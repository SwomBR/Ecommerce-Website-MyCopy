import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Contact from './pages/Contact';
import DetailsPage from "./pages/DetailsPage";
import AboutPage from "./pages/AboutPage"
import Homepage from './pages/Homepage';
import SplashScreen from './pages/SplashScreen';
import Products from './pages/Products'
import Brochures from './pages/BrochurePage';

import CartPage from "./pages/UserPages/CartPage"
import Checkout from "./pages/UserPages/Checkout"

import AdminDashboard from './pages/AdminPages/AdminDashboard';
import UpdateProducts from './pages/AdminPages/UpdateProducts';
import AddProduct from './pages/AdminPages/AddProduct';
import Category from './pages/AdminPages/Category'; 
import AllOrders from './pages/AdminPages/AllOrders';
import Banners from './pages/AdminPages/Banners';
import AllProducts from './pages/AdminPages/AllProducts';
import OrderDetails from './pages/AdminPages/OrderDetails';
import BrochurePage from './pages/BrochurePage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Splash' element={<SplashScreen/>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/bp' element={<BrochurePage/>}/>
        <Route path='/details' element={<DetailsPage/>}/>
       
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/userOrders' element={<UserOrders/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/singOrder' element={<SingleOrder/>}/>
       

        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/update' element={<UpdateProducts/>}/>
        <Route path='/allEnq' element={<AllEnquires/>}/>
        <Route path='/allorder' element={<AllOrders/>}/>
        <Route path='/allProd' element={<AllProducts/>}/>
        <Route path='/ban' element={<Banners/>}/>
        <Route path='/broch' element={<Brochures/>}/>
        <Route path='/enqDetails' element={<EnquiryDetails/>}/>
        <Route path='/ordDetails' element={<OrderDetails/>}/>     
      </Routes>   
    </BrowserRouter>
  )
}

export default App
