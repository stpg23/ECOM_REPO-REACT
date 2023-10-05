import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Base_URL } from "../Config/ConfigURL"
import axios from "axios"
import { toast } from "react-toastify"
import Lottie from 'react-lottie';
import * as animationData from '../Assets/Loading.json'
import { useState } from "react"



const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};








const CheckoutPage = ()=>{
  const navigate  = useNavigate()

  const [loading, setLoading] = useState(false)

    const {state}= useLocation()
    console.log(state)


    const u_id  = useSelector((state)=> state.LoginReducer.login_data.u_id ? state.LoginReducer.login_data.u_id : "")
    const u_name  = useSelector((state)=> state.LoginReducer.login_data.name ? state.LoginReducer.login_data.name : "")
    const u_email  = useSelector((state)=> state.LoginReducer.login_data.email ? state.LoginReducer.login_data.email: "")

    function getSubtotal(){
        let tmp = state
        let total = 0
    
        for(let i = 0  ; i < tmp.length ; i++)
        {
    
          total   = total   + (parseInt(   Number(tmp[i].p_data.price) -  (   Number(tmp[i].p_data.price)   * (Number(tmp[i].p_data.discount) /  100)   ) )) *  tmp[i].quantity
          console.log(total)
        }

        return total

    }


const handleCheckout =  () =>{

    let dt = {
      o_data : state,
       u_id  : u_id,
       u_name : u_name,
       email  : u_email,
        total  :Number(getSubtotal()) + Number((getSubtotal() / 1000).toFixed(2))



    }
    setLoading(true)
    axios.post(Base_URL + 'purchase_order' ,  dt).then((res)=>{
    toast.success(res.data.message)
    setLoading(false)
    navigate('/mycart')
    }).catch((err)=>{
      setLoading(false)
      toast.error(err.response.data.message)
    })

}


return(
    <>

    
        <div className="container" style={{width  :"80%", display:"flex", justifyContent:"center" , alignItems:"center"}}>
{loading == true?
<>
  <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={false}
              isPaused={false}/>
              <h5 style={{color : 'green' , textAlign : "center"}}>Please Wait while we are fetching data for you :)</h5>
        </>

        :
<>
        <div s class="col-sm-4">
      <div class="card" style={{width: '100%'}}>
  <div class="card-body">
    <h5 class="card-title" style={{textAlign : "left"}}>Order Summary ({state.length} Items)</h5>
    <hr></hr>
    <p class="card-text">

    <div class="row">
    <div class="col-sm">
      Items
    </div>
    <div class="col-sm" style={{textAlign:"right"}}>
    &#8377; {getSubtotal()}
    </div>
  </div>
    <div class="row">
    <div class="col-sm">
      Delivary Charge
    </div>
    <div class="col-sm" style={{textAlign:"right"}}>
    &#8377; {(getSubtotal() / 1000).toFixed(2)}
    </div>
  </div>
    <div class="row">
    <div class="col-sm">
      Total
    </div>
    <div class="col-sm" style={{textAlign:"right"}}>
    &#8377;  {Number(getSubtotal().toFixed(2)) + Number((getSubtotal() / 1000).toFixed(2)) }
    </div>
  </div>
  <hr></hr>
    <div class="row">
    <div class="col-sm">
      <h4 style={{color : "brown"}}>Order Total</h4>
    </div>
    <div class="col-sm" style={{textAlign:"right" , color :"brown"}}>
    <h4>&#8377; {Number(getSubtotal().toFixed(2)) + Number((getSubtotal() / 1000).toFixed(2)) }</h4>
    </div>
  </div>
  <hr></hr>
         
         </p>
    <a onClick={handleCheckout} class="btn btn-primary" style={{width : "100%" ,backgroundColor  :"#FFD814" , color:"black" ,  border  :'none'}}>Proceed to Buy</a>
  </div>
  </div>
  </div>
</>
}
        </div>
    </>
)



}

export default CheckoutPage