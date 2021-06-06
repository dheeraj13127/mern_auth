import React, { useEffect } from 'react'
import '../App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import SignUpForm from './SignUpForm'
import {googleLogin} from '../redux/actions/index'

function SignUp() {
  const history=useHistory()
  const dispatch=useDispatch()
  const message=useSelector(state=>state.registerMessage)
  const responseSuccessGoogle=(res)=>{
    console.log(res)
    axios({
      method:'POST',
      url:"http://localhost:7000/api/googleLogin",
      data:{tokenId:res.tokenId}
    }).then(response=>{
      dispatch(googleLogin(response,history))
      localStorage.setItem("imageUrl",res.profileObj.imageUrl)
      localStorage.setItem("wallImage","")
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const responseFailureGoogle=(res)=>{
    console.log(res)
  }
  return (
    <div>
      
        <div className="row p-2">
      <div className="col col-md-6 offset-md-3  bg-dark p-4 text-light" style={{borderRadius:"15px"}}>
      
        {message===""?<SignUpForm/>:(
          <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Redirecting...</p>
        </div>
        )}
<div className="text-center">
{message&&(
  <div className="alert alert-info mt-3" role="alert">
  {message}
  </div>
)}
</div>
{!message&&(
  <div>
    <div className="d-flex justify-content-center mt-2">
        <p>Having an account ?</p>
        <a href="/signIn">SignIn</a>
        </div>
        <p className="text-center">Or</p>
        <div className="text-center">
        <GoogleLogin
         clientId="913126427548-n6fkvi11bmo3l4rdn8b00nlj6gg4sip8.apps.googleusercontent.com"
         buttonText="Signin with Google"
         onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={'single_host_origin'}
       />
        </div>
  </div>
)}
      </div> 
    </div>
      

    </div>
    
  )
}

export default SignUp
