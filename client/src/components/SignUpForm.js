import React,{useState,useEffect} from 'react'
import {registerUser} from '../redux/actions/index'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {connect} from 'react-redux'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
function SignUpForm() {
  const dispatch=useDispatch()
  const history=useHistory()
  const errors=useSelector(state=>state.err)
  const [inputs, setInputs] = useState({firstName:"",lastName:"",userName:"",email:"",password:"",password1:""});
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };
  const handleInputChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }
  const onFormSubmit=(e)=>{
    e.preventDefault()
      if(inputs.firstName===""||inputs.lastName===""||inputs.userName===""||inputs.email===""||inputs.password===""||inputs.password1===""){
        NotificationManager.error('Fill in the fields',"",3000);
      }
      else if(inputs.password1!==inputs.password){
        NotificationManager.error('Passwords do not match',"",3000);
      }
      else{
        const newUser={
          firstName:inputs.firstName,
          lastName:inputs.lastName,
          userName:inputs.userName.toLowerCase(),
          email:inputs.email,
          password:inputs.password,
          password1:inputs.password1
        }
        dispatch(registerUser(newUser,history))
      }
  
   
  }
  return (
    <div>
      <h3 className="text-center mt-2">SignUp</h3>
      <form onSubmit={onFormSubmit}>
      <div className="mb-4">
    <label htmlFor="firstName" className="form-label">First name</label>
    <input type="text" className="form-control" name="firstName"   onChange={handleInputChange} value={inputs.firstName} />
  </div>
  <div className="mb-4">
    <label htmlFor="lastName" className="form-label">Last name</label>
    <input type="text" className="form-control" name="lastName"   onChange={handleInputChange} value={inputs.lastName} />
  </div>
  <div className="mb-4">
    <label htmlFor="userName" className="form-label">User name</label>
    <input type="text" className="form-control" name="userName"   onChange={handleInputChange} value={inputs.userName} />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"   onChange={handleInputChange} value={inputs.email} />
    {errors&&<span className="text-danger"> {errors.userExists}</span>}
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="form-label">Password</label>
    <div className="d-flex align-items-center bg-light">
    <input type={passwordShown ? "text" : "password"} className="form-control" name="password" onChange={handleInputChange} value={inputs.password} />
    {passwordShown?<i className="fas fa-eye text-dark" onClick={togglePasswordVisiblity}></i>:<i className="fas fa-eye-slash text-dark" onClick={togglePasswordVisiblity}></i>}
    </div>

  </div>
  <div className="mb-4">
    <label htmlFor="password1" className="form-label">Confirm Password</label>
    <div className="d-flex align-items-center bg-light">
    <input type={passwordShown1 ? "text" : "password"} className="form-control" name="password1"   onChange={handleInputChange} value={inputs.password1} />
    {passwordShown1?<i className="fas fa-eye text-dark" onClick={togglePasswordVisiblity1}></i>:<i className="fas fa-eye-slash text-dark" onClick={togglePasswordVisiblity1}></i>}
    </div>
    
  </div>
  <div className="text-center">
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
<NotificationContainer/>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
  }
}
export default connect(mapStateToProps)(SignUpForm);
