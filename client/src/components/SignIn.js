import React,{useState} from 'react'
import '../App.css'
import {useSelector,useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/index'
import {useHistory} from 'react-router-dom'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
function SignIn() {
  const history=useHistory()
  const dispatch=useDispatch()
  const errors=useSelector(state=>state.err)
  const [inputs, setInputs] = useState({email:"",password:""});
  
  const handleInputChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }
 const onFormSubmit=e=>{
      e.preventDefault()
      const newUser={
        email:inputs.email,
        password:inputs.password,
      }
      if(inputs.email===""||inputs.password===""){
        NotificationManager.error('Fill in the fields',"",3000);
      }
      else{
    
    
      dispatch(loginUser(newUser,history))
     
      
      }
 }
  return (
    <div className="row p-2">
  
      <div className="col col-md-6 offset-md-3  bg-dark p-4 text-light mt-5" style={{borderRadius:"15px"}}> 
        <h3 className="text-center mt-2">SignIn</h3>
        <form onSubmit={onFormSubmit} autoComplete="off" noValidate>
    <div className="mb-4">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" name="email" required onChange={handleInputChange} value={inputs.email} className="form-control"/>
      {errors&&<span className="text-danger"> {errors.userNotFound}</span>}
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" required onChange={handleInputChange} value={inputs.password}/>
      {errors&&<span className="text-danger"> {errors.passwordError}</span>}
    </div>
    <div className="text-center">
    <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
  <div className="d-flex justify-content-center mt-2">
          <p>Don't have an account ?</p>
          <a href="/signUp">SignUp</a>
          </div>
      </div>
      <NotificationContainer/>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
  }
}
export default connect(mapStateToProps)(SignIn);
