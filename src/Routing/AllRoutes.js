import { Route , Routes  } from 'react-router-dom'
import Home from '../Screens/Home';
import Contact from '../Screens/Contact';
import About from '../Screens/About';
import Navbar from '../Layout/Navbar';
import { useState } from 'react';
import ViewProduct from '../Screens/ViewProduct';
import MyCart from '../Screens/MyCart';
import CheckoutPage from '../Screens/Checkout';
import MyOrders from '../Screens/MyOrders';




function AllRoutes(){


const [color , setColor]  =  useState('green') 




return(
    <>
    <Navbar/>

    <Routes>

            <Route path='/' element ={<Home color={color}   />} />
            <Route path='/home' element ={<Home/>} />
            <Route path='/about' element ={<About/>} />
            <Route path='/contact' element ={<Contact color={color}/>} />
            <Route  path='/mycart' element={<MyCart/>} />
            <Route  path='/myorders' element={<MyOrders/>} />
            <Route path='/viewProduct/:id' element ={<ViewProduct />} />
            <Route path='/checkoutPage/:id' element={<CheckoutPage/>}/>
            <Route path='*' element ={<Home/>} />


    </Routes>
    
    </>
)




}

export default AllRoutes;