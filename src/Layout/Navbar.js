

import {useNavigate} from 'react-router-dom'
import '../Styles/Navbar.css'
import {useDispatch , useSelector} from 'react-redux'



function Navbar(){
  const dispatch = useDispatch()

    const navigate = useNavigate()



    const cart_count  =  useSelector((state)=> state.CartReducer.cart_count  ? state.CartReducer.cart_count  : 0)


   function checkActive(path){

    var y  = window.location.href.includes(path)

    return y

   } 


   function handleLogout(){

    // localStorage.setItem('auth'  ,false)
    // window.location.reload()
    dispatch({type : "LOGIN_FAILED" , login_data : {}})

   }





return(

    <>
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class={`nav-link ${checkActive('home') ? 'active' : "" }`} aria-current="page" onClick={()=> navigate('/home')}>Home</a>
        </li>
        <li class="nav-item">
          <a class={`nav-link ${checkActive('about') ? 'active' : "" }`} aria-current="page" onClick={()=> navigate('/about')}>About</a>
        </li>
        <li class="nav-item">
          <a class={`nav-link ${checkActive('contact') ? 'active' : "" }`} aria-current="page" onClick={()=> navigate('/contact')}>Contact</a>
        </li>
        <li class="nav-item">
          <a class={`nav-link ${checkActive('myorders') ? 'active' : "" }`} aria-current="page" onClick={()=> navigate('/myorders')}>Previous Orders</a>
        </li>
      </ul>
      <div style={{marginRight :20, cursor : "pointer"}}   onClick={()=> navigate('/mycart')} >

      <i class="fa" style={{fontSize:"30px"}}>&#xf07a;</i>
<span class='badge badge-warning' id='lblCartCount'>{cart_count}</span>
      </div>
      <form class="d-flex" role="search">
      
        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
        <button  onClick={handleLogout} class="btn btn-outline-success" type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>
    
    
    </>


)    



}

export default Navbar