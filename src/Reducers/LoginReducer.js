



const LoginReducer =(state , action)=>{


    if(typeof state == 'undefined')
    {
        return{

            login_data : {},
            login_status :  false,
            login_error  : null
        }
    }


    switch(action.type){
        case  "LOGIN_SUCCESS":
            return{
                ...state, 
                login_data  : action.data,
                login_status  :  true
            }
        case  "LOGIN_FAILED":
            return{
                ...state, 
                login_data  : null,
                login_error : {},
                login_status  :  false
            }
        default:
            return state
    }




}

export default LoginReducer