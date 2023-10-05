import AuthRoutes from "./AuthRoutes"

import AllRoutes from "./AllRoutes"
import { useState } from "react"
import {useSelector} from 'react-redux'



function SwitchRouting(){


    // const [auth, setAuth] =  useState(localStorage.getItem('auth'))



    const auth  = useSelector((state)=> state.LoginReducer.login_status ? state.LoginReducer.login_status  : false )


    return(

        <>
            {auth  ? <AllRoutes />  :   <AuthRoutes/>  }

        </>

    )




}

export default SwitchRouting