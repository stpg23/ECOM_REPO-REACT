import SwitchRouting from "./Routing/SwitchRouting"
import {Provider} from 'react-redux'
import store from "./Store/Store"


function App(){


   store.subscribe(()=>{
      localStorage.setItem('reduxStore-stp' ,  JSON.stringify(store.getState()))
   })


return(
<>
<Provider store={store}>

   <SwitchRouting/>

</Provider>
   </>
)



}

export default App