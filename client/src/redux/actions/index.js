import {REGISTER_USER,GET_ERRORS,LOGIN_USER,EMAIL_ACTIVATED,GOOGLE_LOGIN} from '../constants/constantTypes'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import setAuthToken from '../utils/setAuthToken'
export const registerUser=(newUser,history)=>async(dispatch,getState)=>{
  console.log(newUser)
    await axios.post('http://localhost:7000/api/signUp',newUser)
    .then(res=>{dispatch({
      type:REGISTER_USER,
      payload:res.data.message
    })
    localStorage.setItem("imageUrl","")
    localStorage.setItem("wallImage","")
    setTimeout(()=>{
        history.push('/signIn')
    },9000)
  })
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    }))
  
}
export const emailActivation=(bodyParameters,config,data)=>async(dispatch,getState)=>{
  
  axios.post('http://localhost:7000/api/emailActivate',bodyParameters,config)
  .then(res=>{dispatch({
    type:EMAIL_ACTIVATED,
    payload:res.data.message
  })
  console.log(res)
})
  .catch(err=>{dispatch({
    type:GET_ERRORS,
    payload:err.response.data
  })
  console.log(err.response.data)
})
  

}
export const loginUser=(data,history)=>async(dispatch,getState)=>{
  
  axios.post('http://localhost:7000/api/signIn',data)
  .then(res=>{
    const { token } = res.data;
    const userData=res.data.user
    localStorage.setItem("userData",JSON.stringify(userData))
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    NotificationManager.success('SignIn Success',"",2000);
    setTimeout(()=>{
      history.push('/dashboard')
    },2000)
  })
  
  .catch(err=>{dispatch({
    type:GET_ERRORS,
    payload:err.response.data
  })
  console.log(err.response.data)
})
  

}
export const setCurrentUser = decoded => {
  return {
    type: LOGIN_USER,
    payload: decoded
  };
};

export const googleLogin=(response,history)=>async(dispatch,getState)=>{
const userData=response.data.user

localStorage.setItem("userData",JSON.stringify(userData))
const { token } = response.data;
    localStorage.setItem("jwtGToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser1(decoded));
    NotificationManager.success('SignIn Success',"",2000);
    setTimeout(()=>{
      history.push('/dashboard')
    },2000)
    dispatch({
      type:GOOGLE_LOGIN,
      payload:userData
    })

}
export const setCurrentUser1 = decoded => {
  return {
    type: GOOGLE_LOGIN,
    payload: decoded
  };
};
