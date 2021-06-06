import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {emailActivation} from '../redux/actions'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
function Activation() {
  const dispatch=useDispatch()
  const actMessage=useSelector(state=>state.activationMessage)
  const error=useSelector(state=>state.err)
  const history=useHistory()
  const {token} = useParams();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const bodyParameters = {
  token: token
};

  const onActSubmit=()=>{
    dispatch(emailActivation(bodyParameters,config,"success"))
  }
  return (
    <div className="row p-2">
      <div className="col mt-5 bg-dark text-light p-4" style={{borderRadius:"15px"}}>
        <h2 className="text-center">Click on the button to activate your account</h2>
        <div className="text-center mt-5">
        {actMessage=="" ?<button className="btn btn-primary btn-lg" onClick={onActSubmit}>Activate</button>:<div class="alert alert-success" role="alert">{actMessage}</div>}
        {error&&<div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">{error.error}</div>}
            
        </div>

      </div>
    </div>
  )
}

export default Activation
