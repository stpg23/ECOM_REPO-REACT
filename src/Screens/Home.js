import {useEffect, useState} from 'react'
import '../Styles/CardsStyle.css'
import { useNavigate  , Link} from 'react-router-dom'
import { Base_URL } from '../Config/ConfigURL'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'



function Home(){

  const navigate = useNavigate()
  const dispatch  = useDispatch()

 


    const [data , setdata ] = useState([])
    const [cartData, setCartData  ] =  useState([])

    const  modifyData  =  ( )=>{

      let p_data  =  data;
      let c_data  =  cartData;
  
      for(let i = 0 ; i < p_data.length;  i++)
      {
        for(let j = 0 ;  j < c_data.length ;  j++)
        {
          if(p_data[i]._id == c_data[j].p_id)
          {
            p_data[i]['disable'] = true
            console.log("yes")
          }
        }
      }

      console.log(p_data)
  
      return p_data


    
  
    }


 


    const u_id  =  useSelector((state) => state.LoginReducer.login_data.u_id)

    function GetAllProducts(){

      fetch(Base_URL +  'get-all-products').then((res)=> res.json()).then((result)=>{
        console.log(result)
        setdata(result.data)
      })

    }



    function handleViewMore(el){
      // console.log(el)

      navigate('/viewProduct/'  +el._id , {state  : el})



    }

    function getMyCart(){

      axios.get(Base_URL + 'get-my-cart' , {params : {u_id  : u_id}}).then((result)=>{
        console.log(result.data)
        modifyData(data ,result.data.data )
        setCartData(result.data.data)
        dispatch({type : "CART_COUNT" , data : result.data.count})
      })
    }


useEffect(()=>{

  GetAllProducts()
  getMyCart()




},[])






const addToCart =  (el)=>{

  let data  =  {
    p_id   : el._id,
    u_id  :  u_id,
  }
  

  axios.post(Base_URL  + 'add-to-cart' , data  ).then((res)=>{
    toast.success(res.data.message)
    getMyCart()
  }).catch((err)=>{
    toast.error(err.response.data.message)
  })
}




return(

    <>

{/* <table class="table">
  <thead>
    <tr>
      <th scope="col">SR#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
    </tr>
  </thead>
  <tbody>

  {arr.map((el,i)=>(
    <tr>
      <th scope="row">{i +1}</th>
      <td>{el.name}</td>
      <td>{el.email}</td>
      <td>{el.mobile}</td>
    </tr>

))}
    
    
  </tbody>
  </table>
     */}

{modifyData(data).map((el,i)=>(

<div class="card" style={{width: '20rem'}}>
  <img src={el.image} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{  el.name.length >  20 ? <><sapn>{el.name.slice(0,20) + "... " }</sapn>  <a style={{fontSize: 12}} href='' onClick={()=>handleViewMore(el)} >View More</a> </> : el.name}</h5>
    <p class="card-text">{ el.description.length >  20 ? <><sapn>{el.description.slice(0,20) + "... " }</sapn>  <a style={{fontSize: 12}} href='' onClick={()=>handleViewMore(el)} >View More</a> </> : el.description}</p>
    <p  class="card-title"  style={{fontSize:25 , fontWeight : "bold"}} >  {el.discount > 0  ? <span style={{color:"red" , fontSize: 25 ,  fontWeight : "bold"}}>-{el.discount} %</span> : ""} &nbsp;  
    &#8377; { (Number(el.price) -  (Number(el.price) * (Number(el.discount)/  100))).toFixed(2)}
      </p>
    <p  class="card-title"  style={{fontSize :20}} >M.R.P. <s>&#8377; {el.price}</s></p>
    <a onClick={()=> handleViewMore(el)} class="btn btn-primary">View More</a>
    {el.disable == true ? 
        <button style={{marginLeft : 10}} disabled={true} class="btn btn-danger">Already Added</button>

    :

    <a style={{marginLeft : 10}} onClick={()=> addToCart(el)} class="btn btn-success">Add To Cart</a>
}
  </div>
</div>
))}
    



    </>


)


}

export default Home