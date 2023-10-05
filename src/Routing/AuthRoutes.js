import { Route , Routes  } from 'react-router-dom'
import Home from '../Screens/Home';
import Contact from '../Screens/Contact';
import About from '../Screens/About';
import Navbar from '../Layout/Navbar';
import { useState } from 'react';
import ViewProduct from '../Screens/ViewProduct';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import ForgotPassword from '../Screens/ForgotPassword';




function AuthRoutes(){






return(
    <>


    <Routes>

            <Route path='/' element ={<Login  />} />
            <Route path='/login' element ={<Login/>} />
            <Route path='/register' element ={<Register/>} />
            <Route path='/frgpd' element ={<ForgotPassword/>} />
           
            <Route path='*' element ={<Login/>} />


    </Routes>
    
    </>
)




}

export default AuthRoutes;