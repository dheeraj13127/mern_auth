import {GET_ERRORS,REGISTER_USER,EMAIL_ACTIVATED,LOGIN_USER, GOOGLE_LOGIN} from '../constants/constantTypes'
import isEmpty from 'is-empty'
const initState={
  registerMessage:"",
  activationMessage:"",
  isAuthenticated:false,
  errors:{},
  userData:{}
}                                                                    
function rootReducer(state=initState,action){
 switch(action.type){
   case REGISTER_USER:{
     return Object.assign({},state,{
       registerMessage:action.payload,
 
     })
    }
  case EMAIL_ACTIVATED:{
    return Object.assign({},state,{
      activationMessage:action.payload,
      
    })
  }
  case GET_ERRORS:{
      return Object.assign({},state,{
        err:action.payload
      })
    }
  case LOGIN_USER:{
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
      }
    }
    case GOOGLE_LOGIN:{
      return {
        ...state,
        userData:action.payload
      }
    }
 }
 return state
}
export default rootReducer


