import axios from "axios"
import { useState } from "react"
import { Base_URL } from "../Config/ConfigURL"
import { toast } from "react-toastify"
import Lottie from 'react-lottie';
import * as animationData from '../Assets/Loading.json'
import { useNavigate } from "react-router-dom";
const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  






function ForgotPassword(){

    const navigate = useNavigate()



    const [  values , setValues  ] = useState({
        email   : "",
        showForm2  : false,
        loading   :false,
        otp : "",
        new_pass  :"",
        resend : false

    })


    function handleInput (e){


        setValues({...values , [e.target.name] :  e.target.value})

    }

    function handleLogin(){
        var reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(! reg.test(values.email))
        {
          toast.error("Please Enter a Valid Email")
        }
        else{

            setValues({...values ,  ['loading'] :  true})
            axios.post(Base_URL + 'send_otp' , values).then((res)=>{
                toast.success(res.data.message)
                setValues({...values ,  ['loading'] :  false , ['showForm2']  : true ,  ['resend']: false})



            }).catch((err)=>{
                toast.error(err.response.data.message)
                setValues({...values ,  ['loading'] :  false})


            })

        }

    

    }


    function handleOtp(){

        setValues({...values ,  ['loading'] :  true})
        axios.post(Base_URL + 'verify_otp' , values).then((res)=>{
            toast.success(res.data.message)
            setValues({...values ,  ['loading'] :  false , ['showForm2']  : false})
            navigate('/login')



        }).catch((err)=>{
            if(err.response.data.status == 403)
            {
                setValues({...values , ['showForm2'] :  false,  ['loading'] :  false ,['resend']  : true})

            }
            toast.error(err.response.data.message)
            setValues({...values ,  ['loading'] :  false  })


        })

    }



return(

    <>
       

       {values.loading == true  ?   

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
        {values.showForm2 == false ? 
      
        <div  className="login-container">

        <button disabled style={{backgroundColor : "black"  , color :'white'}} type="submit" class="btn btn-primary">RESET YOUR PASSWORD</button>
        <br></br>
        <br></br>
<div class="form-group">
<label for="l1">Email address</label>
<input type="email" name="email" onChange={handleInput}   class="form-control" id="l1"  placeholder="Enter email" />
</div>

<br></br>

<button  onClick={handleLogin} type="submit" class="btn btn-primary">Submit</button>
<br></br>


        </div>

        :






        <div  className="login-container">

        <button disabled style={{backgroundColor : "black"  , color :'white'}} type="submit" class="btn btn-primary">VERIFY OTP</button>
        <br></br>
        <br></br>

{values.resend == false ?
<>

<div class="form-group">
<label for="l1">Enter OTP</label>
<input type="number" name="otp" onChange={handleInput}   class="form-control" id="l1"  placeholder="Enter OTP" />
</div>
<div class="form-group">
<label for="l1">Enter New Password</label>
<input type="text" name="new_pass" onChange={handleInput}   class="form-control" id="l1"  placeholder="Enter New Password" />
</div>

<br></br>
<button  onClick={handleOtp} type="submit" class="btn btn-primary">Submit</button>
<br></br>
</>  :    
<>
<br></br>
<button  onClick={handleLogin} type="submit" class="btn btn-primary">RESEND OTP</button>
<br></br>
</>

}




        </div>
}
</>

}

    
    </>

)



}

export default ForgotPassword