import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Base_URL } from "../Config/ConfigURL"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Lottie from 'react-lottie';
import * as animationData from '../Assets/ndf.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};










function MyCart(){

    const [cartData , setCartData] =  useState([])

const dispatch = useDispatch()

const navigate = useNavigate()


    const u_id  =  useSelector((state) => state.LoginReducer.login_data.u_id)




    function getMyCart(){

        axios.get(Base_URL + 'get-my-detailed-cart' , {params : {u_id  : u_id}}).then((result)=>{
          console.log(result.data)
          
          setCartData(result.data.data)
          dispatch({type : "CART_COUNT" , data : result.data.count})
        })
      }



   useEffect(()=>{
        getMyCart()
   },[])   

   function handleViewMore(el){
    // console.log(el)

    navigate('/viewProduct/'  +el._id , {state  : el})



  }




  function getSubtotal(){
    let tmp = cartData
    let total = 0

    for(let i = 0  ; i < tmp.length ; i++)
    {

        total   = total   + (parseInt(   Number(tmp[i].p_data.price) -  (   Number(tmp[i].p_data.price)   * (Number(tmp[i].p_data.discount) /  100)   ) )) *  tmp[i].quantity
      console.log(total)
    }



    


  return total

    
  }


  const handleQunaIncre = (x , y) =>{
    let dy =  {
      cd_id : x,
      quan  :  Number(y)   +1
    }
    axios.post(Base_URL + 'update-quantity' , dy).then((res)=>{
      toast.success(res.data.message)
      getMyCart()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })

  }

  const handleQunaDecre = (x , y) =>{
      let dy =  {
      cd_id : x,
      quan  :  Number(y)   - 1
    }
    if((y -1) == 0)
    {
      let c = window.confirm('Do you want to remove this item ?')

      if(c == true)
      {
        axios.post(Base_URL + 'update-quantity' , dy).then((res)=>{
          toast.success(res.data.message)
          getMyCart()
        }).catch((err)=>{
          toast.error(err.response.data.message)
        })
      }

    }
    else{
axios.post(Base_URL + 'update-quantity' , dy).then((res)=>{
      toast.success(res.data.message)
      getMyCart()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
    }
  
  
    

  }


const handleCheckout =  ()=>{
  let rd = Math.floor(Math.random() *  564758898)
  navigate('/checkoutPage/'+ rd  , {state  : cartData}  )
}


return(



    <div class="container">


      {cartData.length > 0?


    <> 
    <div class="row" >
      <div  class="col-sm-8">

  {cartData.map((el,i)=>(




      <div class="row" style={{padding : 5}}>
                <div  class="col-sm-4">


                <img src={el.p_data.image} class="card-img-top" alt="..."/>

              



                </div>
                <div  class="col-sm-8">
                <h5 class="card-title">{  el.p_data.name}</h5>
                <p  class="card-title"  style={{fontSize:25 , fontWeight : "bold"}} >  {el.p_data.discount > 0  ? <span style={{color:"red" , fontSize: 25 ,  fontWeight : "bold"}}>-{el.p_data.discount} %</span> : ""} &nbsp;  
    &#8377; { (Number(el.p_data.price) -  (Number(el.p_data.price) * (Number(el.p_data.discount)/  100))).toFixed(2)}
      </p>

      <p  class="card-title"  style={{fontSize :20}} >M.R.P. <s>&#8377; {el.p_data.price}</s></p>


      <div class="container"  style={{padding : 10}}>
  <div class="row">
    <div class="col-sm-5" style={{textAlign  :"right"}}>
    <button class="btn btn-danger"   onClick={()=>{handleQunaDecre(el._id , el.quantity)}} style={{fontSize: 20, fontWeight : "bold"}}  >-</button>

    </div>
    <div class="col-sm-1" style={{fontSize: 20, fontWeight : "bold"}}>
      {el.quantity}
    </div>
    <div class="col-sm-5">
        <button class="btn btn-success"  onClick={()=>{handleQunaIncre(el._id , el.quantity)}} style={{fontSize: 20, fontWeight : "bold"}} >+</button>

    </div>
  </div>
</div>


                </div>

                <hr></hr>
      
    </div>

))}


      </div>
      <div s class="col-sm-4">
      <div class="card" style={{width: '100%'}}>
  <div class="card-body">
    <h5 class="card-title">Subtotal (1 item):  {getSubtotal()}  </h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a  class="btn btn-primary" onClick={handleCheckout}  style={{width : "100%" ,backgroundColor  :"#FFD814" , color:"black" ,  border  :'none'}}>Proceed to Buy</a>
  </div>
</div>
      </div>
      
    </div>

    </>

    : 
    <Lottie options={defaultOptions}
      height={400}
      width={400}
      isStopped={false}
      isPaused={false}/>
  }

  </div>
)


}

export default MyCart