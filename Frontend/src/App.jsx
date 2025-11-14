import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Contact from './pages/Contact';
import DetailsPage from "./pages/DetailsPage";
import AboutPage from "./pages/AboutPage"
import Homepage from './pages/Homepage';
import SplashScreen from './pages/SplashScreen';
import Products from './pages/Products';
import ServicePage from './pages/ServicePage';
import Projects from './pages/Projects';

import CartPage from "./pages/UserPages/CartPage";
import Checkout from "./pages/UserPages/Checkout";
import ProfilePage from "./pages/UserPages/ProfilePage";
import UserOrders from "./pages/UserPages/UserOrders";
import SingleOrder from "./pages/UserPages/SingleOrder";

import AdminDashboard from './pages/AdminPages/AdminDashboard';
import UpdateProducts from './pages/AdminPages/UpdateProducts';
import AddProduct from './pages/AdminPages/AddProduct';
import Category from './pages/AdminPages/Category'; 
import AllOrders from './pages/AdminPages/AllOrders';
import AllProducts from './pages/AdminPages/AllProducts';
import OrderDetails from './pages/AdminPages/OrderDetails';
import AllEnquiries from './pages/AdminPages/AllEnquiries';
import EnquiryDetails from './pages/AdminPages/EnquiryDetails';
import EnquiryForm from './components/EnquiryForm';
import FaqAdmin from './pages/AdminPages/FaqAdmin';
import FAQuser from './pages/FAQuser';
import AdminLogin from './pages/AdminPages/AdminLogin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/> 
        <Route path='/products' element={<Products/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/viewProduct/:id' element={<DetailsPage/>}/>
        <Route path='/enquiryForm' element={<EnquiryForm/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/services' element={<ServicePage/>}/>
        <Route path='/faq' element={<FAQuser/>}/>

        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/userOrders' element={<UserOrders/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/singOrder' element={<SingleOrder/>}/>

        <Route path='/admin/login' element={<AdminLogin/>}/>

        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/update/:id' element={<UpdateProducts/>}/>
        <Route path='/allEnq' element={<AllEnquiries/>}/>
        <Route path='/allorder' element={<AllOrders/>}/>
        <Route path='/allProducts' element={<AllProducts/>}/>
        <Route path='/enqDetails/:id' element={<EnquiryDetails/>}/>
        <Route path='/ordDetails' element={<OrderDetails/>}/>   
        <Route path='/faqAdmin' element={<FaqAdmin/>}/>    
      </Routes>   
    </BrowserRouter>
  )
}

export default App
