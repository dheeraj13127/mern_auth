import React, { useState,useEffect } from 'react'
import wall from './images/wall.jpg'
import avatar from './images/avatar.png'
import '../App.css'
import {useHistory} from 'react-router-dom'
function Dashboard() {
  const history=useHistory()
  const [img,setImg]=useState("")
  const [profileFile,setProfileFile]=useState()
  const [user,setUser]=useState({})
  useEffect(() => {
  const imgurl=localStorage.getItem("imageUrl")
  setImg(imgurl)
  },[img])
 
  useEffect(async ()=>{
    const wallImg=localStorage.getItem("wallImage")
    setProfileFile(wallImg)
  },[])
 useEffect(()=>{
   const userData=localStorage.getItem("userData")
   const userd=JSON.parse(userData)

   setUser(userd)
 },[])

  const fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = (e) =>{    
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          localStorage.setItem("wallImage",e.target.result)
        };
        reader.readAsDataURL(e.target.files[0]);
      } setTimeout(()=>{
        window.location.reload(false)
      },1000)

        }
       
    }
    const fileUploadButton1 = () => {
      document.getElementById('fileButton').click();
      document.getElementById('fileButton').onchange = (e) =>{    
        if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            localStorage.setItem("imageUrl",e.target.result)
          };
          reader.readAsDataURL(e.target.files[0]);
        }setTimeout(()=>{
          window.location.reload(false)
        },1000)
          }
          
      }
      const userLogout=()=>{
        localStorage.clear()
        history.push('/signIn')
      }
    
    const wallStyle={
      
      backgroundImage:profileFile!==""?`url(${profileFile})`:`url(${wall})`,
      backgroundPosition:"center",
      backgroundSize:"cover",
  
    }
    
  return (
    <div className="row">
    <div className="col col-sm-12 col-lg-s12">
    <div className="d-flex justify-content-end">
    <button className="btn btn-danger mt-5" onClick={userLogout}>Logout</button>
    </div>
  
      <div className="profileContainer col-lg-12 mt-5 bg-light p-2" style={{borderRadius:"15px"}}>
      <h3 className="text-center">My Profile</h3>
      <div className="d-flex justify-content-center">
      <div className="col-md-12 d-flex align-items-center justify-content-center p-3 wallBg img-fluid" style={wallStyle}>
        <img src={img===""?avatar:img} alt="" style={{width:"100px",height:"100px",zIndex:"2",border:"1px solid white",borderRadius:"50%"}}/>
        <p></p>
      </div>
      </div>
      <div className="p-2 mt-2">
      <div className="text-center">
      
          <input id="fileButton" type="file" hidden />
          <button className="btn btn-primary text-light pl-3" onClick={fileUploadButton1}>
              Upload Profile Image
          </button>
          <br />
          <br />
          <input id="fileButton" type="file" hidden />
          <button className="btn btn-primary text-light" onClick={fileUploadButton}>
              Upload Wall Image
          </button>
         
          </div>
          <p className="text-danger text-center">Note: Image size less than 2mb</p>
      </div>
      <div className="mt-3 p-2 bg-primary text-center text-light">
        <p>Name: {user.firstName+" "+ user.lastName}</p>
        <p>Username: {user.userName}</p>
        <p>Email: {user.email}</p>
      </div>
      
      </div>
    </div>
    </div>
  )
}

export default Dashboard
