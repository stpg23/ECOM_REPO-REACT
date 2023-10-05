import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Base_URL } from "../Config/ConfigURL"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import moment from 'moment'






const MyOrders =  ()=>{


    const [data , setData ] = useState([])

    const uid  =  useSelector((state)=> state.LoginReducer.login_data.u_id ?  state.LoginReducer.login_data.u_id: "")



    function getOrdHistory(){
        axios.get(Base_URL + 'get-orders-history' , {params : {u_id: uid}}).then((res)=>{
            setData(res.data.data)
            console.log(res.data.data)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })

    }

    useEffect(()=>{
getOrdHistory()
    },[])

 return(
<div className="container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Order Number</th>
      <th scope="col">Order ID</th>
      <th scope="col">Status</th>
      <th scope="col">Amount</th>
      <th scope="col">Time</th>
      <th scope="col">View Order</th>
    </tr>
  </thead>
  <tbody>
    {data.map((el , i)=>(
 <tr>
 <th scope="row">{i+1}</th>
 <td>{el.ord_id}</td>
 <td>{el._id}</td>
 <td>{el.status == 0  ? "Pending"  :"Delivered"}</td>
 <td>{el.total}</td>
 <td>{moment(new Date(el.time)).format('MMMM Do YYYY, h:mm:ss a')}</td>
 <td><button  class="btn btn-success"  style={{width : "100%" }}>View Order</button>
</td>
</tr>
    ))}
   

  </tbody>
</table>

</div>

 )   

}

export default MyOrders