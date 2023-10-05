import { useState } from "react"
import {useDispatch ,  useSelector} from 'react-redux'


function Contact(){

    const dispatch = useDispatch()


 var count  =  useSelector((state)=> state.CountReducer.count ? state.CountReducer.count  : 0 )


    



    const incre=()=>{

        
dispatch({type : "INCRE" ,  count  : count +1})


    }

    const decre  = ()=>{
        dispatch({type : "DECRE" ,  count  : count -1}) // Dispatch a Action

    }



    return(
    <>
    
        <h1>Value of Count is {count}</h1>
        <button  onClick={incre} >Incre </button>
        <button  onClick={decre} >Decre </button>
    </>

    )    




    
    
    
    
    }
    
    
    export default Contact